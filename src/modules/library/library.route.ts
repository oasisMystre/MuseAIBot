import type { z } from "zod";
import type { FastifyInstance, FastifyRequest } from "fastify";

import { sunoApi } from "../../lib";
import { getLibrariesSchema, insertLibrariesSchema } from "../../schema";
import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibraries,
  getLibrariesOnlyByUser,
  mapLibrariesWithAudioInfos,
  updateLibrary,
} from "./library.controller";
import { createDto } from "./dto/create.dto";
import { paginateSchema } from "../dto/paginate.dto";

const getLibrariesOnlyByUserRoute = async function (
  req: FastifyRequest<{ Querystring: z.infer<typeof paginateSchema> }>
) {
  const { offset, limit } = await paginateSchema.parseAsync(req.query);

  const libraries = await getLibrariesOnlyByUser(
    {
      userId: req.user.id,
    },
    offset,
    limit
  );

  return {
    offset,
    limit,
    results: await mapLibrariesWithAudioInfos(libraries),
  };
};

export const getLibrariesRoute = async function (
  req: FastifyRequest<{ Querystring: z.infer<typeof paginateSchema> }>
) {
  const { offset, limit } = await paginateSchema.parseAsync(req.query);

  const libraries = await getLibraries(offset, limit);

  return {
    offset,
    limit,
    results: await mapLibrariesWithAudioInfos(libraries),
  };
};

const createLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{ Body: z.infer<typeof createDto> }>
) {
  const body = req.body;
  const data: any[] = [];

  await createDto.parseAsync(body).then(async (values) => {
    const { isCustom, isInstrumental, title, prompt, tags, waitAudio } = values;
    const suno = await sunoApi;
    const audioInfos = isCustom
      ? await suno.generate({
          prompt,
          title,
          wait_audio: waitAudio,
          make_instrumental: isInstrumental,
          tags: tags!.join(","),
        })
      : await suno.generate({ prompt });

    for (const audioInfo of audioInfos) {
      const libraries = await createLibrary({
        title: audioInfo.title ?? title,
        id: audioInfo.id,
        likes: [],
        userId: req.user.id,
      });

      data.push(
        ...libraries.map((library) => ({
          library,
          audioInfo,
        }))
      );
    }
  });

  return data;
};

const updateLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{
    Params: z.infer<typeof getLibrariesSchema>;
    Body: Partial<z.infer<typeof insertLibrariesSchema>>;
  }>
) {
  const params = req.params;
  const body = req.body;

  return insertLibrariesSchema
    .omit({ id: true, userId: true, updateAt: true, createdAt: true })
    .partial()
    .parseAsync(body)
    .then((values) =>
      updateLibrary(params, Object.assign(values, { userId: req.user.id }))
    );
};

const deleteLibrariesOnlyByUserRoute = async function (
  req: FastifyRequest<{ Params: z.infer<typeof getLibrariesSchema> }>
) {
  const params = req.params;

  return getLibrariesSchema.parseAsync(params).then((values) =>
    deleteLibraryOnlyByUser({
      ...values,
      userId: req.user.id,
    })
  );
};

export const libraryRoutes = function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/libraries/explore/",
    preHandler: fastify.authenticate,
    handler: getLibrariesRoute,
  });

  fastify.route({
    method: "GET",
    url: "/libraries/",
    preHandler: fastify.authenticate,
    handler: getLibrariesOnlyByUserRoute,
  });

  fastify.route({
    method: "POST",
    url: "/libraries/",
    preHandler: fastify.authenticate,
    handler: createLibraryOnlyByUserRoute,
  });

  fastify.route({
    method: "PATCH",
    url: "/libraries/:id/",
    preHandler: fastify.authenticate,
    handler: updateLibraryOnlyByUserRoute,
  });

  fastify.route({
    method: "DELETE",
    url: "/libraries/:id/",
    preHandler: fastify.authenticate,
    handler: deleteLibrariesOnlyByUserRoute,
  });
};

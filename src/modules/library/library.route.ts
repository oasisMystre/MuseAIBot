import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { suno } from "../../lib";
import { paginateSchema } from "../dto/paginate.dto";
import type {  AudioInfo } from "../../lib/suno/model";
import { getLibrariesSchema, insertLibrariesSchema, selectLibrariesSchema } from "../../schema";

import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibraries,
  getLibrariesOnlyByUser,
  mapLibrariesWithAudioInfos,
  updateLibrary,
} from "./library.controller";
import { createDto } from "./dto/create.dto";

const getLibrariesOnlyByUserRoute = async function (
  req: FastifyRequest<{ Querystring: Zod.infer<typeof paginateSchema> }>
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
  req: FastifyRequest<{ Querystring: Zod.infer<typeof paginateSchema> }>
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
  req: FastifyRequest<{ Body: Zod.infer<typeof createDto> }>,
  reply: FastifyReply
) {
  const body = req.body;
  const data: {library: Zod.infer<typeof selectLibrariesSchema>, audioInfo: AudioInfo}[] = [];

  await createDto.parseAsync(body).then(async (values) => {
    const { isCustom, isInstrumental, title, prompt, tags, waitAudio } = values;

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
    Params: Zod.infer<typeof getLibrariesSchema>;
    Body: Partial<Zod.infer<typeof insertLibrariesSchema>>;
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
  req: FastifyRequest<{ Params: Zod.infer<typeof getLibrariesSchema> }>
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

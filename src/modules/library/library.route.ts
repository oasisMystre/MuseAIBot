import type { z } from "zod";
import type { FastifyInstance, FastifyRequest } from "fastify";

import { sunoApi } from "../../lib";
import { getLibrariesSchema, insertLibrariesSchema } from "../../schema";
import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibraries,
  getLibrariesOnlyByUser,
  updateLibrary,
} from "./library.controller";
import { createDto } from "./dto/create.dto";

const getLibrariesOnlyByUserRoute = async function (req: FastifyRequest) {
  const suno = await sunoApi;
  const libraries = await getLibrariesOnlyByUser({
    userId: req.user.id,
  });

  if (libraries.length === 0) return [];

  const songIds = libraries.map(({ id }) => id);
  const audioInfos = await suno.get(songIds);

  return audioInfos.map((audioInfo) => {
    const library = libraries.find((library) => library.id === audioInfo.id);
    return { audioInfo, library };
  });
};

export const getLibrariesRoute = async function () {
  return getLibraries();
};

const createLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{ Body: z.infer<typeof createDto> }>
) {
  const body = req.body;
  const data: any[] = [];

  await createDto.parseAsync(body).then(async (values) => {
    const { isCustom, isInstrumental, title, prompt, tags, waitAudio } = values;
    const suno = await sunoApi;
    const audioInfos = await (isCustom
      ? suno.custom_generate(
          prompt,
          tags!.join(","),
          title!,
          isInstrumental,
          waitAudio!
        )
      : suno.generate(prompt, isInstrumental, waitAudio!));

    for (const audioInfo of audioInfos) {
      const libraries = await createLibrary({
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
    handler: getLibraries,
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

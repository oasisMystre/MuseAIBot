import type { z } from "zod";
import type { FastifyInstance, FastifyRequest } from "fastify";

import { getLibrariesSchema, insertLibrariesSchema } from "../../schema";
import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibrariesOnlyByUser,
  updateLibrary,
} from "./library.controller";

const getLibrariesOnlyByUserRoute = async function (req: FastifyRequest) {
  return getLibrariesOnlyByUser({
    userId: req.user.id,
  });
};

const createLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{ Body: z.infer<typeof insertLibrariesSchema> }>
) {
  const body = req.body;
  return insertLibrariesSchema
    .parseAsync(body)
    .then((values) =>
      createLibrary(Object.assign(values, { userId: req.user.id }))
    );
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

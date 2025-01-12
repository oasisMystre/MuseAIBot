import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Suno } from "../../lib";
import { paginateSchema } from "../dto/paginate.dto";
import { getLibrariesSchema, insertLibrariesSchema } from "../../schema";

import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibraries,
  getLibrariesOnlyByUser,
  updateLibraryById,
} from "./library.controller";
import { createDto } from "./dto/create.dto";

const getLibrariesOnlyByUserRoute = async function (
  req: FastifyRequest<{ Querystring: Zod.infer<typeof paginateSchema> }>,
) {
  const { offset, limit } = await paginateSchema.parseAsync(req.query);

  const libraries = await getLibrariesOnlyByUser(
    {
      userId: req.user.id,
    },
    offset,
    limit,
  );

  return {
    offset,
    limit,
    results: libraries,
  };
};

export const getLibrariesRoute = async function (
  req: FastifyRequest<{ Querystring: Zod.infer<typeof paginateSchema> }>,
) {
  const { offset, limit } = await paginateSchema.parseAsync(req.query);

  const libraries = await getLibraries(offset, limit);

  return {
    offset,
    limit,
    results: libraries,
  };
};

const createLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{ Body: Zod.infer<typeof createDto> }>,
  reply: FastifyReply,
) {
  const body = req.body;

  return createDto.parseAsync(body).then(async (values) => {
    const { isCustom, instrumental, title, prompt, tags } = values;

    const {
      data: {
        data: { taskId },
      },
    } = isCustom
      ? await Suno.instance.generate.generate({
          prompt,
          title,
          instrumental,
          style: tags?.join(""),
          callBackUrl:
            process.env.RENDER_EXTERNAL_URL + "/micellenous/webhook/suno/",
        })
      : await Suno.instance.generate.generate({ prompt, instrumental });

    const [library] = await createLibrary({
      title,
      likes: [],
      id: taskId,
      userId: req.user.id,
    });

    return library;
  });
};

const updateLibraryOnlyByUserRoute = async function (
  req: FastifyRequest<{
    Params: Zod.infer<typeof getLibrariesSchema>;
    Body: Partial<Zod.infer<typeof insertLibrariesSchema>>;
  }>,
) {
  const params = req.params;
  const body = req.body;

  return insertLibrariesSchema
    .omit({ id: true, userId: true, updateAt: true, createdAt: true })
    .partial()
    .parseAsync(body)
    .then((values) =>
      updateLibraryById(
        params.id,
        Object.assign(values, { userId: req.user.id }),
      ),
    );
};

const deleteLibrariesOnlyByUserRoute = async function (
  req: FastifyRequest<{ Params: Zod.infer<typeof getLibrariesSchema> }>,
) {
  const params = req.params;

  return getLibrariesSchema.parseAsync(params).then((values) =>
    deleteLibraryOnlyByUser({
      ...values,
      userId: req.user.id,
    }),
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

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Suno } from "../../lib";
import { paginateSchema } from "../dto/paginate.dto";
import {
  getLibrariesSchema,
  insertLibrariesSchema,
  selectLibrariesSchema,
} from "../../schema";

import {
  createLibrary,
  deleteLibraryOnlyByUser,
  getLibraries,
  getLibrariesOnlyByUser,
  getLibraryById,
  updateLibraryById,
} from "./library.controller";
import { createDto } from "./dto/create.dto";

const getLibrariesByUserRoute = async function (
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

export const getLibraryRoute = async function (
  req: FastifyRequest<{
    Params: Pick<Zod.infer<typeof selectLibrariesSchema>, "id">;
  }>,
) {
  return selectLibrariesSchema
    .pick({ id: true })
    .parseAsync(req.params)
    .then(async (params) => {
      const library = await getLibraryById(params.id);
      return library;
    });
};

const createLibraryRoute = async function (
  req: FastifyRequest<{ Body: Zod.infer<typeof createDto> }>,
) {
  const body = req.body;

  return createDto.parseAsync(body).then(async (values) => {
    const { customMode, instrumental, title, prompt, tags } = values;
    const callBackUrl =
      process.env.RENDER_EXTERNAL_URL + "/micellenous/webhook/suno/";

    const {
      data: {
        data: { taskId },
      },
    } = customMode
      ? await Suno.instance.generate.generate({
          prompt,
          title,
          customMode,
          instrumental,
          callBackUrl,
          style: tags?.join(""),
        })
      : await Suno.instance.generate.generate({
          prompt,
          customMode,
          instrumental,
          callBackUrl,
        });

    const [library] = await createLibrary({
      title,
      likes: [],
      id: taskId,
      userId: req.user.id,
    });

    return library;
  });
};

const updateLibraryRoute = async function (
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

const deleteLibraryRoute = async function (
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
    handler: getLibrariesByUserRoute,
  });

  fastify.route({
    method: "GET",
    url: "/libraries/:id/",
    preHandler: fastify.authenticate,
    handler: getLibraryRoute,
  });

  fastify.route({
    method: "POST",
    url: "/libraries/",
    preHandler: fastify.authenticate,
    handler: createLibraryRoute,
  });

  fastify.route({
    method: "PATCH",
    url: "/libraries/:id/",
    preHandler: fastify.authenticate,
    handler: updateLibraryRoute,
  });

  fastify.route({
    method: "DELETE",
    url: "/libraries/:id/",
    preHandler: fastify.authenticate,
    handler: deleteLibraryRoute,
  });
};

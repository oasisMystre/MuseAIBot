import { FastifyInstance, FastifyRequest } from "fastify";

import { LyricBody } from "../dto/micellenous.dto";

type Body = {
  prompt: string;
};

async function generateLyricsRoute(req: FastifyRequest<{ Body: Body }>) {
  return LyricBody.parseAsync(req.body).then(async (body) => {
    const { prompt } = body;

    return prompt;
  });
}

export const micellenousRoutes = function (fastify: FastifyInstance) {
  fastify.route({
    url: "/micellenous/lyrics",
    method: "POST",
    preHandler: fastify.authenticate,
    handler: generateLyricsRoute,
  });
};

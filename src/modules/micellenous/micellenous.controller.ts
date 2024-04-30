import { FastifyInstance, FastifyRequest } from "fastify";

import { sunoApi } from "../../lib";
import { LyricBody } from "../dto/micellenous.dto";

type Body = {
  prompt: string;
};

async function generateLyricsRoute(req: FastifyRequest<{ Body: Body }>) {
  return LyricBody.parseAsync(req.body).then(async (body) => {
    const { prompt } = body;
    const suno = await sunoApi;

    return suno.generateLyrics(prompt);
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

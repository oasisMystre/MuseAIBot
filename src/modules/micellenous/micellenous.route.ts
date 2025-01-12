import { FastifyInstance, FastifyRequest } from "fastify";

import { openai } from "../../config";
import OpenAI from "../../lib/openai";
import { LyricBody } from "../dto/micellenous.dto";
import { sunoCallbackRoute } from "./webhook.route";

type Body = {
  prompt: string;
};

async function generateLyricsRoute(req: FastifyRequest<{ Body: Body }>) {
  return LyricBody.parseAsync(req.body).then(async (body) => {
    const { prompt } = body;

    return new OpenAI(openai).generateLyrics(prompt);
  });
}

export const micellenousRoutes = function (fastify: FastifyInstance) {
  fastify.route({
    url: "/micellenous/lyrics",
    method: "POST",
    preHandler: fastify.authenticate,
    handler: generateLyricsRoute,
  }).route({
    url: "/micellenous/webhook/suno",
    method: "POST",
    handler: sunoCallbackRoute,
  });
};

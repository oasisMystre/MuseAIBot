import { objectToCamel } from "ts-case-convert";
import type { FastifyReply, FastifyRequest } from "fastify";

import type { Response } from "../../lib/suno/models/response.model";

import type { SunoData } from "./dto/sunoData.dto";
import {
  getLibraryById,
  updateLibraryById,
} from "../library/library.controller";

export const sunoCallbackRoute = async (
  request: FastifyRequest<{ Body: Response<SunoData> }>,
  reply: FastifyReply,
) => {
  const body = request.body;

  const library = await getLibraryById(body.data.task_id);
  if (library) {
    const data = objectToCamel(body.data.data);
    return updateLibraryById(library.id, {
      data,
      status: body.data.callbackType,
    });
  }
  return reply.status(404).send({ message: "Library with task not found" });
};

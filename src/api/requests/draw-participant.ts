import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const drawParticipantResponseSchema = z
  .object({
    cdParticipanteEvento: z.number(),
    nuInscricaoEvento: z.number(),
    nomeParticipante: z.string(),
  })
  .or(z.string());

export type DrawParticipantVariables = {
  cdRegistroEvento: number;
};

export type DrawParticipantResponse = z.infer<
  typeof drawParticipantResponseSchema
>;

export async function drawParticipant(variables: DrawParticipantVariables) {
  return await request({
    method: apiEvents.post,
    url: "/participantes/sortear-participante",
    body: variables,
    schema: drawParticipantResponseSchema,
    // schema: ,
  });
}

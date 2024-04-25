import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const drawParticipantResponseSchema = z.object({
  cdParticipanteEvento: z.number(),
  nuInscricaoEvento: z.number(),
  nomeParticipante: z.string(),
});

export type DrawParticipantVariables = {
  cdRegistroEvento: number;
};

export type DrawParticipantResponse = z.infer<
  typeof drawParticipantResponseSchema
>;

export async function drawParticipant(variables: DrawParticipantVariables) {
  return await request({
    method: api.post,
    url: "/participantes/sortear-participante",
    body: variables,
    schema: drawParticipantResponseSchema,
  });
}

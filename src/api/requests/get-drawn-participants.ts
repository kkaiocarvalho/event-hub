import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const getDrawnParticipantsResponseSchema = z.array(
  z.object({
    cdParticipanteEvento: z.number(),
    nuInscricaoEvento: z.number(),
    nomeParticipante: z.string(),
  })
);

export type GetDrawnParticipantsResponse = z.infer<
  typeof getDrawnParticipantsResponseSchema
>;

export async function getDrawnParticipants(idEvent: string) {
  return await request({
    method: api.get,
    url: `/participantes/buscar-participantes-sorteados/${idEvent}`,
    schema: getDrawnParticipantsResponseSchema,
  });
}

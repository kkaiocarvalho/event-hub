import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const getDrawParticipantsResponseSchema = z.array(
  z.object({
    cdParticipanteEvento: z.number(),
    nuInscricaoEvento: z.number(),
    nomeParticipante: z.string(),
    emailParticipante: z.string(),
  })
);

export type GetDrawnParticipantsResponse = z.infer<
  typeof getDrawParticipantsResponseSchema
>;

export async function getDrawParticipants(idEvent: string) {
  return await request({
    //method: apiEvents.get,
    method: apiEvents.post,
    url: `/participantes/buscar-participantes-sorteados/${idEvent}`,
    schema: getDrawParticipantsResponseSchema,
  });
}

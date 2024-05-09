import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const unsubscriptionEventResponseSchema = z.object({
  cdParticipanteEvento: z.number(),
  enumInscricaoEvento: z.string(),
  statusInscricaoEvento: z.string(),
  nuInscricaoEvento: z.number(),
  evento: z.object({
    nomeEvento: z.string(),
    nomeResponsavel: z.string(),
    dtInicio: z.string(),
    dtEncerramento: z.string(),
    statusEvento: z.string(),
  }),
  dtRegistroParticipacao: z.string(),
});

export type UnsubscriptionEventVariables = {
  cdRegistroEvento: number;
};

export type UnsubscriptionEventResponse = z.infer<
  typeof unsubscriptionEventResponseSchema
>;

export async function unsubscriptionEvent(
  variables: UnsubscriptionEventVariables
) {
  // just mock, its not the final endpoint
  return await request({
    method: apiEvents.post,
    url: "/participantes/excluir-participacao-evento",
    body: variables,
    schema: unsubscriptionEventResponseSchema,
  });
}

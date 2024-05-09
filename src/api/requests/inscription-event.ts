import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const inscriptionEventResponseSchema = z.object({
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

export type InscriptionEventVariables = {
  cdRegistroEvento: number;
};

export type InscriptionEventResponse = z.infer<
  typeof inscriptionEventResponseSchema
>;

export async function inscriptionEvent(variables: InscriptionEventVariables) {
  return await request({
    method: apiEvents.post,
    url: "/participantes/incluir-participacao-evento",
    body: variables,
    schema: inscriptionEventResponseSchema,
  });
}

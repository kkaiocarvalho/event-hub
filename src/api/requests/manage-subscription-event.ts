import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const manageSubscriptionEventResponseSchema = z.object({
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

export type ManageSubscriptionEventVariables = {
  cdRegistroEvento: number;
  tipoSolicitacao: "INSCREVER" | "DESINSCREVER";
};

export type ManageSubscriptionEventResponse = z.infer<
  typeof manageSubscriptionEventResponseSchema
>;

export async function manageSubscriptionEvent(
  variables: ManageSubscriptionEventVariables
) {
  return await request({
    method: apiEvents.post,
    url: "/participantes/gerenciar-inscricao-evento",
    body: variables,
    schema: manageSubscriptionEventResponseSchema,
  });
}

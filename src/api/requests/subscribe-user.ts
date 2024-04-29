import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const subscribeUserResponseSchema = z.object({
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

export type SubscribeUserVariables = {
  cdRegistroEvento: number;
};

export type SubscribeUserResponse = z.infer<typeof subscribeUserResponseSchema>;

export async function subscribeUser(variables: SubscribeUserVariables) {
  return await request({
    method: apiEvents.post,
    url: "/participantes/incluir-participacao-evento",
    body: variables,
    schema: subscribeUserResponseSchema,
  });
}

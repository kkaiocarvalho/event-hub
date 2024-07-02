import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const SubscribedUser = z.object({
  nomeParticipante: z.string(),
  emailParticipante: z.string(),
  nuRegistroParticipacao: z.number(),
  statusParticipacao: z.string(),
  formaEntrada: z.string().nullable().nullable(),
  formaSaida: z.string().nullable(),
  dtEntradaEvento: z.string().nullable(),
  dtSaidaEvento: z.string().nullable(),
  sorteado: z.string(),
});

const listSubscribedInEventResponseSchema = z.object({
  cdRegistroEvento: z.number(),
  participantes: z.array(SubscribedUser),
});

export type ListSubscribedInEventVariables = {
  cdRegistroEvento: number;
};

export type ListSubscribedInEventResponse = z.infer<
  typeof listSubscribedInEventResponseSchema
>;
export type SubscribedUser = z.infer<typeof SubscribedUser>;

export async function listSubscribedInEvent(
  variables: ListSubscribedInEventVariables
) {
  return await request({
    method: apiEvents.get,
    url: `/eventos/detalhe-participantes-evento?cdRegistroEvento=${variables.cdRegistroEvento}`,
    schema: listSubscribedInEventResponseSchema,
  });
}

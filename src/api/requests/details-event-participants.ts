import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const detailsParticipantsResponseSchema = z.object({
  cdRegistroEvento: z.number(),
  nomeEvento: z.string(),
  statusEvento: z.string(),
  complementoEvento: z.string(),
  motivoCancelamentoEvento: z.string(),
  dtInicio: z.string(),
  dtEncerramento: z.string(),
  numeroMaximoParticipantes: z.number(),
  dtRegistroEvento: z.string(),
  dtUltimaAtualizacaoEvento: z.string(),
  participantes: z.object({
      nomeParticipante: z.string(),
      emailParticipante: z.string(),
      nuRegistroParticipacao: z.number(),
      statusParticipacao: z.string(),
      formaEntrada: z.string(),
      formaSaida: z.string(),
      dtEntradaEvento: z.string(),
      dtSaidaEvento: z.string(),
      sorteado: z.string(),
      dtRegistroParticipacao: z.string()
    })
});

export type DetailsParticipantsResponse = z.infer<
  typeof detailsParticipantsResponseSchema
>;

export async function detailsParticipants(idEvent:string) {
    return await request({
        method: apiEvents.get,
        url: `/eventos/detalhe-participantes-evento/${idEvent}`,
        schema: detailsParticipantsResponseSchema,
    })
}
import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const listEventsResponseSchema = z.object({
  eventos: z.array(
    z.object({
      cdRegistroEvento: z.number(),
      nomeEvento: z.string(),
      statusEvento: z.string(),
      complementoEvento: z.string(),
      motivoCancelamentoEvento: z.string().nullable(),
      valorIngresso: z.number().nullable(),
      nomeResponsavel: z.string(),
      dtInicio: z.string(),
      dtEncerramento: z.string(),
      numeroMaximoParticipantes: z.number(),
      dtRegistroEvento: z.string(),
      dtUltimaAtualizacaoEvento: z.string().nullable(),
      endereco: z.object({
        cdEnderecoEvento: z.number(),
        numeroCEP: z.string(),
        estado: z.string(),
        cidade: z.string(),
        numero: z.string(),
        logradouro: z.string(),
        complemento: z.string(),
      }),
    })
  ),

  paginacao: z.object({
    qntItensRetornados: z.number(),
    paginaAtual: z.number(),
    proximaPagina: z.number().nullable(),
    temProximaPagina: z.boolean(),
  }),
});

type FilterType = {
  campo: string;
  operacao: string;
  valor: string;
};

export type ListEventsVariables = {
  filtros: FilterType[];
  apenasMeusEventos: string; // "S" | "N"
  paginacao: {
    pagina: number;
    qntItensPaginados: number;
  };
};

export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>;

export async function listEvents(variables: ListEventsVariables) {
  return await request({
    method: apiEvents.post,
    url: "/eventos/listar-eventos",
    body: variables,
    schema: listEventsResponseSchema,
  });
}

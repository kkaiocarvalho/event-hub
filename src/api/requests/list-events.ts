import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";
import {
  EventStatus,
  FilterEventField,
  FilterEventOperation,
  ParticipationStatus,
} from "../../utils/constants";

const Event = z.object({
  cdRegistroEvento: z.number(),
  nomeEvento: z.string(),
  statusEvento: z.nativeEnum(EventStatus),
  statusParticipacao: z.nativeEnum(ParticipationStatus),
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
    complemento: z.string().nullable(),
  }),
});

const listEventsResponseSchema = z.object({
  eventos: z.array(Event),

  paginacao: z.object({
    qntItensRetornados: z.number(),
    paginaAtual: z.number(),
    proximaPagina: z.number().nullable(),
    temProximaPagina: z.boolean(),
  }),
});

export type FilterType = {
  campo: FilterEventField;
  operacao: FilterEventOperation;
  valor: string;
};

export type ListEventsVariables = {
  filtros: FilterType[];
  apenasMeusEventos: "S" | "N";
  paginacao: {
    pagina: number;
    qntItensPaginados: number;
  };
};

export type Event = z.infer<typeof Event>;

export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>;

export async function listEvents(variables: ListEventsVariables) {
  return await request({
    method: apiEvents.post,
    url: "/eventos/listar-eventos",
    body: variables,
    schema: listEventsResponseSchema,
  });
}

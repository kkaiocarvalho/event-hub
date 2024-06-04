import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";
import { FilterEventField, FilterEventOperation } from "../../utils/constants";
import { EventSchema } from "../types";

const listEventsResponseSchema = z.object({
  eventos: z.array(EventSchema),
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

export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>;

export async function listEvents(variables: ListEventsVariables) {
  return await request({
    method: apiEvents.post,
    url: "/eventos/listar-eventos",
    body: variables,
    schema: listEventsResponseSchema,
  });
}

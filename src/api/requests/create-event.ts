import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const createEventResponseSchema = z.object({
  cdRegistroEvento: z.number(),
  nomeEvento: z.string(),
  complementoEvento: z.string(),
  dtInicio: z.string(),
  dtEncerramento: z.string(),
  notificarEntradaParticipantes: z.string(), // "S" | "N"
  numeroMaximoParticipantes: z.number(),
  valorIngresso: z.number(),
  endereco: z.object({
    cdEnderecoEvento: z.number(),
    numeroCEP: z.string(),
    siglaEstado: z.string(),
    cidade: z.string(),
    numero: z.string(),
    logradouro: z.string(),
    complemento: z.string(),
  }),
});

export type CreateEventVariables = {
  nomeEvento: string;
  complementoEvento: string;
  dtInicio: string;
  dtEncerramento: string;
  notificarEntradaParticipantes: string; // "S" | "N"
  numeroMaximoParticipantes: number | null;
  valorIngresso: number;
  endereco: {
    cdEnderecoEvento?: number;
    numeroCEP: string;
    siglaEstado: string;
    cidade: string;
    numero: string;
    logradouro: string;
    complemento: string;
  };
};

export type CreateEventResponse = z.infer<typeof createEventResponseSchema>;

export async function createEvent(variables: CreateEventVariables) {
  return await request({
    method: apiEvents.post,
    url: "/eventos/criar-evento",
    body: variables,
    schema: createEventResponseSchema,
  });
}

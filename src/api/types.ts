import { z } from "zod";
import { EventStatus, ParticipationStatus } from "../utils/constants";

export const EventSchema = z.object({
  cdRegistroEvento: z.number(),
  nomeEvento: z.string(),
  statusEvento: z.nativeEnum(EventStatus),
  statusParticipacao: z.nativeEnum(ParticipationStatus),
  complementoEvento: z.string(),
  motivoCancelamentoEvento: z.string().nullable(),
  valorIngresso: z.number().nullable(),
  nomeResponsavel: z.string(),
  meuEvento: z.boolean(),
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

export type Event = z.infer<typeof EventSchema>;

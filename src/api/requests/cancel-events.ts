import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const cancelEventResponseSchema = z.object({
  enumAdvertencia: z.string(),
  message: z.string(),
});

export type CancelEventVariables = {
  cdRegistroEvento: number;
  motivoCancelamentoEvento: string;
};

export type CancelEventResponse = z.infer<typeof cancelEventResponseSchema>;

export async function cancelEvent(variables: CancelEventVariables) {
  const { motivoCancelamentoEvento } = variables;
  return await request({
    method: apiEvents.put,
    url: `/eventos/cancelar-evento?cdRegistroEvento=${variables.cdRegistroEvento}`,
    body: { motivoCancelamentoEvento },
    schema: cancelEventResponseSchema,
  });
}

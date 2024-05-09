import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const cancelEventResponseSchema = z.object({
  enumAdvertencia: z.string(),
  message: z.string(),
});

export type CancelEventVariables = {
  motivoCancelamentoEvento: string;
};

export type CancelEventResponse = z.infer<typeof cancelEventResponseSchema>;

export async function cancelEvent(variables: CancelEventVariables) {
  return await request({
    method: apiEvents.put,
    url: "/eventos/cancelar-evento",
    body: variables,
    schema: cancelEventResponseSchema,
  });
}

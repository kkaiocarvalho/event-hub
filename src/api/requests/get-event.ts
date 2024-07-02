import { z } from "zod";
import { request } from "../../config/request";
import { apiEvents } from "../../config/api";
import { EventSchema } from "../types";

const getEventResponseSchema = EventSchema;

export type GetEventVariables = {
  eventId: number;
};

export type GetEventResponse = z.infer<typeof getEventResponseSchema>;

export async function getEvent({ eventId }: GetEventVariables) {
  return await request({
    method: apiEvents.get,
    url: `/eventos/buscar-evento?cdRegistroEvento=${eventId}`,
    schema: getEventResponseSchema,
  });
}

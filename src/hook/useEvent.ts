import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QK_EVENT } from "../utils/constants";
import { getEvent, GetEventResponse } from "../api/requests/get-event";

export function useEvent(eventId: number) {
  const eventQuery = useQuery({
    queryKey: [QK_EVENT, eventId],
    queryFn: () => getEvent({ eventId }),
    enabled: !!eventId,
    placeholderData: keepPreviousData,
  });

  const event = eventQuery.data as GetEventResponse | undefined;

  return { event, eventQuery };
}

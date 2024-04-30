import { Text } from "@gluestack-ui/themed";
import { ListEventsResponse } from "../api/requests/list-events";

type EventCardType = {
  event: ListEventsResponse["eventos"][0];
};

export function EventCard({ event }: EventCardType) {
  return <Text>{event.nomeEvento}</Text>;
}

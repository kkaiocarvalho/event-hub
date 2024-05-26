import { Center, Text } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Event } from "../api/requests/list-events";
import { EventStackProps } from "../routes/EventsStack";

export function EventDetails({ route }: EventStackProps) {
  const event = (route.params as { event: Event }).event as Event;
  console.log({ event });
  return (
    <Background>
      <Center>
        <Text>EVENTO {event?.nomeEvento}</Text>
      </Center>
    </Background>
  );
}

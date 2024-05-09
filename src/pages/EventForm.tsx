import { Center, VStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { UseFormReturn } from "react-hook-form";
import { EventFormValues } from "./CreateEvent";

type EventFormProps = {
  form: UseFormReturn<EventFormValues>;
};

export function EventForm({ form }: EventFormProps) {
  const {
    setFocus,
    formState: { errors },
    control,
  } = form;

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between">
        <Title text="Dados do Evento" />
        <Center p="$3">
          <VStack w="$full">
            <Input
              placeholder="Cineminha"
              label="Nome do evento"
              inputName="eventForm.name"
              control={control}
              variant="outline"
              errorMessage={errors.eventForm?.name?.message}
              nextInput={() => setFocus("eventForm.complement")}
            />
            <Input
              placeholder="Uma noite cheia de filmes"
              label="Complemento do evento"
              inputName="eventForm.complement"
              control={control}
              variant="outline"
              errorMessage={errors.eventForm?.complement?.message}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}

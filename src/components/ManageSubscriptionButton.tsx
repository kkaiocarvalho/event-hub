import {
  useToast,
  VStack,
  ToastTitle,
  ToastDescription,
  Toast,
} from "@gluestack-ui/themed";
import { Button } from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  manageSubscriptionEvent,
  ManageSubscriptionEventResponse,
} from "../api/requests/manage-subscription-event";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QK_EVENT } from "../utils/constants";
import {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
import { useUserAndEventRelationship } from "../hook/useUserAndEventRelationship";

type ManageSubscriptionButtonProps = {
  eventId: number;
};

export function ManageSubscriptionButton({
  eventId,
}: ManageSubscriptionButtonProps) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const {
    interactionButtonTitle,
    interactionButtonAction,
    interactionButtonIcon,
    canInteractWithEvent,
    interactWithEventBody,
    isLoadingRelations,
  } = useUserAndEventRelationship(eventId);

  const manageSubscriptionEventMutation = useMutation({
    mutationFn: manageSubscriptionEvent,
    onSuccess(response) {
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="success" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Sucesso</ToastTitle>
                <ToastDescription>
                  {
                    (response as ManageSubscriptionEventResponse)
                      .statusInscricaoEvento
                  }{" "}
                  com sucesso!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      queryClient.refetchQueries({ queryKey: [QK_EVENT, eventId] });
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors.join(", ");

      if (message) {
        configToast.closeAll();
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast action="error" variant="accent" top={insets.top}>
                <VStack space="xs">
                  <ToastTitle>Erro ao interagir com evento</ToastTitle>
                  <ToastDescription>{message}</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    },
  });

  const handleEventInteract = () => {
    const body = interactWithEventBody();
    if (!body) return;
    manageSubscriptionEventMutation.mutate(body);
  };

  const isLoading =
    manageSubscriptionEventMutation.isPending || isLoadingRelations;

  return (
    <>
      <Button
        flex={1}
        text={interactionButtonTitle}
        iconSize={24}
        action={interactionButtonAction}
        rightIcon={interactionButtonIcon}
        isDisabled={!canInteractWithEvent}
        isLoading={isLoading}
        onPress={() => handleEventInteract()}
      />
    </>
  );
}

import { CheckIcon, CloseCircleIcon, CloseIcon } from "@gluestack-ui/themed";
import { EventStatus } from "../utils/constants";
import { ManageSubscriptionEventVariables } from "../api/requests/manage-subscription-event";
import { Event } from "../api/types";

enum UserStatusRelationToEvent {
  MEU_EVENTO = "Meu evento",
  CHEIO = "Cheio",
  NAO_REGISTRADO = "Disponível",
  REGISTRADO = "Inscrito",
  REGISTRO_CANCELADO = "Inscrição excluida",
  FALTANTE = "Faltante",
  PRESENTE = "Presente",
}

enum ColorUserRelationToEvent {
  MEU_EVENTO = "info",
  CHEIO = "warning",
  NAO_REGISTRADO = "info",
  REGISTRADO = "success",
  REGISTRO_CANCELADO = "error",
  FALTANTE = "error",
  PRESENTE = "success",
}

enum MyEventStatusMessage {
  ABERTO = "Aberto",
  CANCELADO = "Cancelado",
  ENCERRADO = "Finalizado",
}

enum MyEventStatusColor {
  ABERTO = "success",
  CANCELADO = "error",
  ENCERRADO = "muted",
}

enum UserButtonActionInteractToEvent {
  NAO_REGISTRADO = "positive",
  REGISTRADO = "negative",
  REGISTRO_CANCELADO = "positive",
  FALTANTE = "primary",
  PRESENTE = "primary",
}

enum UserButtonTextInteractToEvent {
  NAO_REGISTRADO = "Se inscrever",
  REGISTRADO = "Remover inscrição",
  REGISTRO_CANCELADO = "Se inscrever",
  FALTANTE = "Faltou",
  PRESENTE = "Compareceu",
}

export function useUserAndEventRelationship(event: Event) {
  const icons = {
    NAO_REGISTRADO: CheckIcon,
    REGISTRADO: CloseIcon,
    REGISTRO_CANCELADO: CheckIcon,
    FALTANTE: CloseCircleIcon,
    PRESENTE: CheckIcon,
  };

  const isEventFull = false;
  // const eventIsFull = event.numeroMaximoParticipantes >= 100

  const userEventStatus =
    isEventFull
      ? UserStatusRelationToEvent.CHEIO
      : event
      ? UserStatusRelationToEvent[event.statusParticipacao]
      : UserStatusRelationToEvent.NAO_REGISTRADO;

  const color =
    isEventFull
      ? ColorUserRelationToEvent.CHEIO
      : event
      ? ColorUserRelationToEvent[event.statusParticipacao]
      : ColorUserRelationToEvent.NAO_REGISTRADO;

  const interactionButtonAction = event
    ? UserButtonActionInteractToEvent[event.statusParticipacao]
    : UserButtonActionInteractToEvent.NAO_REGISTRADO;

  const canInteractWithEvent = EventStatus.OPEN === event?.statusEvento;

  const interactionButtonIcon = event
    ? icons[event.statusParticipacao]
    : icons.NAO_REGISTRADO;

  const interactionButtonTitle = event
    ? UserButtonTextInteractToEvent[event.statusParticipacao]
    : UserButtonTextInteractToEvent.NAO_REGISTRADO;

  const myEventStatus = event.meuEvento
    ? MyEventStatusMessage[event.statusEvento]
    : null;
  const myEventColor = event.meuEvento
    ? MyEventStatusColor[event.statusEvento]
    : null;

  const interactWithEventBody = () => {
    if (!canInteractWithEvent) return;

    const body: ManageSubscriptionEventVariables = {
      cdRegistroEvento: event.cdRegistroEvento,
      tipoSolicitacao:
        interactionButtonTitle === "Se inscrever"
          ? "INSCREVER"
          : "DESINSCREVER",
    };
    return body;
  };

  return {
    userEventStatus,
    myEventStatus,
    myEventColor,
    interactionButtonTitle,
    interactionButtonIcon,
    canInteractWithEvent,
    interactionButtonAction,
    interactWithEventBody,
    color,
  };
}

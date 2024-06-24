import { CheckIcon, CloseCircleIcon, CloseIcon } from "@gluestack-ui/themed";
import { useUser } from "./useUser";
import { EventStatus } from "../utils/constants";
import { ManageSubscriptionEventVariables } from "../api/requests/manage-subscription-event";
import { Event } from "../api/types";

enum UserStatusRelationToEvent {
  MEU_EVENTO = "Meu evento",
  NAO_REGISTRADO = "Não inscrito",
  REGISTRADO = "Inscrito",
  REGISTRO_CANCELADO = "Inscrição excluida",
  FALTANTE = "Faltante",
  PRESENTE = "Presente",
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
  const { user } = useUser();

  const icons = {
    NAO_REGISTRADO: CheckIcon,
    REGISTRADO: CloseIcon,
    REGISTRO_CANCELADO: CheckIcon,
    FALTANTE: CloseCircleIcon,
    PRESENTE: CheckIcon,
  };

  //TODO: add export color and icons correctly
  //TODO: when get event participants ok, refactor to contains the follow status
  // USER RELATED TO EVENT:  "Faltante", "Presente", "Registrado", "Cancelado"
  // and additional state "Sorteado" off this initial list

  // EVENT STATE: "Inscrito", "Insc. Removida", "Dispoível" and "Cheio".
  // ("Disponível" and "Cheio" must be compared with number max of participans and atual count of participans)

  const userEventStatus = event
    ? UserStatusRelationToEvent[event.statusParticipacao]
    : UserStatusRelationToEvent.NAO_REGISTRADO;

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
    interactionButtonTitle,
    interactionButtonIcon,
    canInteractWithEvent,
    interactionButtonAction,
    interactWithEventBody,
  };
}

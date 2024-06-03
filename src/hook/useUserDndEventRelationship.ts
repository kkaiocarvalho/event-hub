import { CheckIcon, CloseCircleIcon, CloseIcon } from "@gluestack-ui/themed";
import { Event } from "../api/requests/list-events";
import { useUser } from "./useUser";
import { EventStatus } from "../utils/constants";
import { ManageSubscriptionEventVariables } from "../api/requests/manage-subscription-event";

enum UserStatusRelationToEvent {
  NAO_REGISTRADO = "Não inscrito",
  REGISTRADO = "Inscrito",
  REGISTRO_CANCELADO = "Inscrição excluida",
  FALTANTE = "Faltante",
  PRESENTE = "Presente",
}

enum UserButtonTextInteractToEvent {
  NAO_REGISTRADO = "Se inscrever",
  REGISTRADO = "Remover inscrição",
  REGISTRO_CANCELADO = "Se inscrever",
  FALTANTE = "Faltou",
  PRESENTE = "Compareceu",
}

export function useUserDndEventRelationship(event: Event) {
  const { userData } = useUser();

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

  const userEventStatus = UserStatusRelationToEvent[event.statusParticipacao];
  const interactionButtonTitle =
    UserButtonTextInteractToEvent[event.statusParticipacao];
  const canInteractWithButton = EventStatus.OPEN === event.statusEvento;
  const interactionButtonIcon = icons[event.statusParticipacao];

  const interactWithEventBody = () => {
    if (!canInteractWithButton) return;

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
    canInteractWithButton,
    interactWithEventBody,
  };
}

export const AUTH_TOKEN = "@token";

export const QK_EVENT_LIST = "qk:event-list";
export const QK_ME = "qk:me";
export const QK_REGISTERED_EVENT_LIST = "qk:registered-event-list";
export const QK_RECENT_ADDRESSES = "qk:recent-addresses";

export enum UserPermissions {
  User = "USUARIO",
  Organizer = "ORGANIZADOR",
  Admin = "ADMINISTRADOR",
}

export enum EventStatus {
  OPEN = "ABERTO",
  CLOSED = "FECHADO",
  CANCELED = "CANCELADO",
  SHUT_DOWN = "ENCERRADO",
}

export enum ParticipationStatus {
  NOT_REGISTERED = "NAO_REGISTRADO",
  REGISTERED = "REGISTRADO",
  REGISTRATION_CANCELED = "REGISTRO_CANCELADO",
  MISSING = "FALTANTE",
  PRESENT = "PRESENTE",
}

export enum FilterEventField {
  START_DATE = "dtInicioEvento",
  ID = "cdRegistroEvento",
  EVENT_STATUS = "statusEvento",
  USER_STATUS = "statusParticipacao",
}

export enum FilterEventOperation {
  GREATER = "maior",
  SMALLER = "menor",
  EQUAL = "igual",
  CONTAINS = "contem",
  GREATER_THAN = "maiorIgual",
  LESS_THAN = "menorIgual",
  NOT_CONTAIN = "naoContem",
}

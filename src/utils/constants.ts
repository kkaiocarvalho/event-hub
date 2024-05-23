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
}

export enum ParticipationStatus {
  "Não registrado" = "NAO_REGISTRADO",
  "Registrado" = "REGISTRADO",
  "Registro Cancelado" = "REGISTRO_CANCELADO",
  "Faltante" = "FALTANTE",
  "Presente" = "PRESENTE",
}

import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const qrcodeCheckInResponseSchema = z.object({
  cdParticipanteEvento: z.number(),
  enumInscricaoEvento: z.string(),
  statusInscricaoEvento: z.string(),
  nuInscricaoEvento: z.number(),
  evento: z.object({
    nomeEvento: z.string(),
    nomeResponsavel: z.string(),
    dtInicio: z.string(),
    dtEncerramento: z.string(),
    statusEvento: z.string()
  }),
  dtRegistroParticipacao: z.string()
});

type QrCodeCheckInVariables = {
  cdRegistroEvento: number,
  tipoSolicitacao: "CHECKIN" | "CHECKOUT",
  formaSolicitacao: "QRCODE" | "MANUAL",
  chaveQRCode: string,
  cpfParticipante: string
};

export async function qrCodeCheckIn(variables: QrCodeCheckInVariables) {
  return await request({
    method: apiEvents.put,
    url: "/participantes/gerenciar-participacao-evento",
    body: variables,
    schema: qrcodeCheckInResponseSchema
  });
}
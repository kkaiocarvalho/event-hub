import { z } from "zod";
import { apiEvents } from "../../config/api";
import { request } from "../../config/request";

const qrcodeGenerateResponseSchema = z.object({
  mensagem: z.string(),
  qrcode: z.string(),
});

export type QrCodeGenerateVariables = {
  cdRegistroEvento: number;
};

export type QrCodeGenerateResponse = z.infer<
  typeof qrcodeGenerateResponseSchema
>;

export async function qrCodeGenerate(variables: QrCodeGenerateVariables) {
  return await request({
    method: apiEvents.post, 
    url: "/eventos/qrcode",
    body: variables,
    schema: qrcodeGenerateResponseSchema,
  });
}

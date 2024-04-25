import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const validateTokenResponseSchema = z.object({
  status: z.string(),
});

export type ValidateTokenResponse = z.infer<typeof validateTokenResponseSchema>;

export async function validateToken() {
  return await request({
    method: api.get,
    url: "/autenticacao/validar-tokoen",
    schema: validateTokenResponseSchema,
  });
}

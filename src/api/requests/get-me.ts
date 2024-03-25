import { z } from "zod";
import { api } from "../../config/api";

const getMeResponseSchema = z.object({
  nome: z.string(),
});

export type GetMeResponse = z.infer<typeof getMeResponseSchema>;

export async function getMe() {
  const response = await api.get("/autenticacao/me");
  return getMeResponseSchema.parse(response.data);
}

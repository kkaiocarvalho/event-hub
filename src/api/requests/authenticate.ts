import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const authenticateResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
});

export type AuthenticateVariables = {
  email: string;
  senha: string;
};

export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;

export async function authenticate(variables: AuthenticateVariables) {
  return await request<AuthenticateResponse>({
    method: api.post,
    url: "/autenticacao/login",
    body: variables,
    schema: authenticateResponseSchema,
  });
}

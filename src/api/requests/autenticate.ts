import { z } from "zod";
import { api } from "../../config/api";

const authenticateResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
});

export type AuthenticateVariables = {
  email: string;
  password: string;
};

export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;

export async function authenticate(variables: AuthenticateVariables) {
  const response = await api.post("autenticacao/login", {
    email: variables.email,
    senha: variables.password,
  });
  return authenticateResponseSchema.parse(response.data);
}

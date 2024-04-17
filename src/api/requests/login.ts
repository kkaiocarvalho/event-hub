import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const loginUserResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
});

export type LoginUserVariables = {
  email: string;
  senha: string;
};

export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;

export async function login(variables: LoginUserVariables) {
  return await request({
    method: api.post,
    url: "/autenticacao/login",
    body: variables,
    schema: loginUserResponseSchema,
  });
}

import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const createUserResponseSchema = z.object({
  cdPessoa: z.number(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string(),
  telefone: z.string(),
  permissao: z.object({
    cdPermissao: z.number(),
    descricaoPermissao: z.string(),
  }),
  flAtivo: z.string(),
  dataInclusao: z.string(),
  dataAlteracao: z.string(),
});

export type CreateUserVariables = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
};

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export async function createUser(variables: CreateUserVariables) {
  return await request({
    method: api.post,
    url: "/dados-cadastrais/criar-usuario",
    body: variables,
    schema: createUserResponseSchema,
  });
}

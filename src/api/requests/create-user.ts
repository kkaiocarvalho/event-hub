import { z } from "zod";
import { api } from "../../config/api";

//TODO: zod to errors states

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
  console.log("caiu aqui ", variables);
  //TODO: await with no response (lets work in this with Mr.Gods - swagger not responding)
  const token = await api.get("autenticacao/validar-token");
  console.log({ token });
  const response = await api.post("dados-cadastrais/criar-usuario", variables);
  return createUserResponseSchema.parse(response.data);
}

import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const getUserResponseSchema = z.object({
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

export type GetUserVariables = {
  userId: string;
};

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export async function getUser({ userId }: GetUserVariables) {
  return await request({
    method: api.get,
    url: `/dados-cadastrais/buscar-usuario/${userId}`,
    schema: getUserResponseSchema,
  });
}

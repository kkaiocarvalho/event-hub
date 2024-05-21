import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const getMeResponseSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  email: z.string(),
  telefone: z.string(),
  permissao: z.string(),
  flAtivo: z.string(),
  dataInclusao: z.string(),
  dataAlteracao: z.string().nullable(),
});

export type GetMeResponse = z.infer<typeof getMeResponseSchema>;

export async function getMe() {
  return await request({
    method: api.get,
    url: "dados-cadastrais/usuario-logado",
    schema: getMeResponseSchema,
  });
}

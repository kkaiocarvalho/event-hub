import { z } from "zod";
import { apiCep } from "../../config/api";
import { request } from "../../config/request";

const getAddressByCodeResponseSchema = z.object({
  cep: z.string(),
  uf: z.string(),
  localidade: z.string(),
  logradouro: z.string(),
  bairro: z.string(),
});

export type GetAddressByCodeVariables = {
  addressCode: string;
};

export type GetAddressByCodeResponse = z.infer<
  typeof getAddressByCodeResponseSchema
>;

export async function getAddressByCode({
  addressCode,
}: GetAddressByCodeVariables) {
  return await request({
    method: apiCep.get,
    url: `/${addressCode}/json/`,
    schema: getAddressByCodeResponseSchema,
  });
}

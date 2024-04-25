import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const getAddressByCodeResponseSchema = z.object({
  data: z.object({
    cep: z.string(),
    uf: z.string(),
    localidade: z.string(),
    logradouro: z.string(),
    bairro: z.string(),
  })
});

export type GetAddressByCodeVariables = {
  addressCode: string;
};

export type GetAddressByCodeResponse = z.infer<typeof getAddressByCodeResponseSchema>;

export async function getAddressByCode({addressCode}: GetAddressByCodeVariables) {
  return await request({
    method: api.get,
    url: `/${addressCode}/json/`,
    schema: getAddressByCodeResponseSchema,
  });
}

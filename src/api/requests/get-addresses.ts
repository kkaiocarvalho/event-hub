import { z } from "zod";
import { api } from "../../config/api";
import { request } from "../../config/request";

const getAddressesResponseSchema = z.array(
  z.object({
    cdEnderecoEvento: z.number(),
    estado: z.string(),
    cidade: z.string(),
    cep: z.string(),
    nuEndereco: z.string(),
    logradouro: z.string(),
    dsEndereco: z.string(),
    dtInclusao: z.string(),
  })
);

export type GetAddressesResponse = z.infer<typeof getAddressesResponseSchema>;

export async function getAddresses() {
  return await request({
    method: api.get,
    url: "/eventos/enderecos-registrados",
    schema: getAddressesResponseSchema,
  });
}

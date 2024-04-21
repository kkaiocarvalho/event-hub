//Nome do arquivo deve ser em minusculo, em inglês e separado por "-"

//===================== Importações padrão =======================
import { z } from "zod";
import { api } from "../../config/api";
//================================================================

//Este é a estrutura que será retornada para o front-end caso a requisição for 200,
// o nome começa em minusculo e depois continua em camelCase (mesmo nome da função exportada), seguido de "ResponseSchema"
const createUserResponseSchema = z.object({
  // Segue um exemplo de tipificação dos valores com zod, para mais tipagens buscar em https://www.npmjs.com/package/zod#primitives
  valorNumber: z.number(),
  valorString: z.string(),
  valorObjeto: z.object({
    valorNumber: z.number(),
    valorString: z.string(),
  }),
});

//Este é o tipo de dados que a função exportada receberá (caso seja necessário enviar alguma coisa),
// neste caso a nomenclatura será tem camelCase porém com a primeira letra maiúscula seguido de "Variables"
export type CreateUserVariables = {
  string: string;
  number: number;
  date: Date;
};

//Este é o tipo de dados que a função exportada retornará quando chamada e ela é do tipo (typeof === "do tipo") do responseSchema
// neste caso a nomenclatura será tem camelCase porém com a primeira letra maiúscula seguido de "Response"
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

//Esta é a famosa função exportada, que é o coração deste arquivo, sua nomeclatura é a base de tudo então não tem sufixos
export async function createUser(variables: CreateUserVariables) {
  //Aqui será o corpo da função, que conterá o a api, seguida pelo método (get, post),
  // e como primeiro parâmetro a url a ser consultada, seguido se necessário pelo "variables",
  // proveniente da função exportada
  const response = await api.post("/dados-cadastrais/criar-usuario", variables);
  return createUserResponseSchema.parse(response.data);
}

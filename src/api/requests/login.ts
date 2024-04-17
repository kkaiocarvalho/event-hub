import { z } from "zod";
import { api } from "../../config/api";

const loginUserResponseSchema = z.object({
    token: z.string(),
    expiresIn: z.number(),
  });

  export type LoginUserVariables = {
    email: string;
    senha: string;
  };

export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;

export async function loginUser(variables: LoginUserVariables) {
    console.log("caiu aqui ", variables);
    //TODO: await with no response (lets work in this with Mr.Gods - swagger not responding)
    const token = await api.get("autenticacao/login");
    console.log({ token });
    const response = await api.post("dados-cadastrais/buscar-usuario", variables);
    return loginUserResponseSchema.parse(response.data);
  }
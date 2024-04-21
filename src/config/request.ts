import { AxiosError } from "axios";
import { api } from "./api";
import { z } from "zod";

const invalidDataSchema = z.object({
  code: z.number(),
  correlationError: z.string(),
  errors: z.array(z.string()),
});

const ruleErrorSchema = z.object({
  enumError: z.string(),
  message: z.string(),
});

const internalErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
  correlationError: z.string(),
});

export type InvalidDataSchemaResponse = z.infer<typeof invalidDataSchema>;
export type RuleErrorSchemaResponse = z.infer<typeof ruleErrorSchema>;
export type InternalErrorSchemaResponse = z.infer<typeof internalErrorSchema>;

export type RequestErrorSchema =
  | InvalidDataSchemaResponse
  | RuleErrorSchemaResponse
  | InternalErrorSchemaResponse
  | AxiosError;

type RequestProps = {
  method: typeof api.get | typeof api.post | typeof api.delete;
  url: string;
  body?: any;
  schema: z.ZodObject<any>;
};

export async function request<T = unknown>({
  method,
  url,
  body = {},
  schema,
}: RequestProps): Promise<T | AxiosError> {
  return await method(url, body)
    .then((response) => schema.parse(response.data) as T)
    .catch((err: AxiosError) => {
      const response = err.response;
      if (!response) return err;
      const status = response?.status as number;
      const schema =
        status === 500
          ? internalErrorSchema
          : status === 400
          ? invalidDataSchema
          : [401, 404, 422].includes(status)
          ? ruleErrorSchema
          : undefined;
      if (!schema) return Promise.reject(err.response);

      return Promise.reject(schema.parse(response.data));
    });
}

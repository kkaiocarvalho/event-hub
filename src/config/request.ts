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

enum ErrorResponse {
  "invalidDataSchema" = 400,
  "ruleErrorSchema" = 422,
  "internalErrorSchema" = 500,
}

const errorResponseSchema = {
  invalidDataSchema: invalidDataSchema,
  ruleErrorSchema: ruleErrorSchema,
  internalErrorSchema: internalErrorSchema,
};

type RequestProps = {
  method: typeof api.get | typeof api.post | typeof api.delete;
  url: string;
  body?: any;
  schema: z.ZodObject<any>;
};

export async function request({
  method,
  url,
  body = {},
  schema,
}: RequestProps) {
  return await method(url, body)
    .then((response) => schema.parse(response))
    .catch((err: AxiosError) => {
      const response = err.response;
      if (!response) return err;
      const status = response?.status as number;
      const schema =
        errorResponseSchema[
          ErrorResponse[status] as
            | "invalidDataSchema"
            | "ruleErrorSchema"
            | "internalErrorSchema"
        ];

      return Promise.reject(schema.parse(response.data));
    });
}

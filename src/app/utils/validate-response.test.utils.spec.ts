import { zodError } from 'app/data/model/api-Response.model';
import z, { ZodType } from 'zod';

export function validateResponse<ResponseDataType>(
  response: unknown,
  schema: ZodType<{
    success: boolean;
    data?: ResponseDataType;
    error?: unknown;
  }>
): asserts response is { success: true; data: ResponseDataType } {
  const parseResult = schema.safeParse(response);

  if (!parseResult.success) {
    console.log('Raw API Response:', response);

    fail(`Validation failed: ${JSON.stringify(parseResult.error.issues)}`);
    // throw new Error(`Validation failed: ${JSON.stringify(parseResult.error.issues)}`);
  }

  const actualData = parseResult.data?.data;

  if (actualData === undefined || actualData === null) {
    fail('Validation failed: The response "data" field is empty or undefined.');
  }

  if (Array.isArray(actualData) && actualData.length === 0) {
    fail(
      `Validation failed: Response data is an array but it is empty (length 0).`
    );
  }
}

export const createApiResponseSchema = <T>(dataSchema: ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: zodError.optional(),
  });

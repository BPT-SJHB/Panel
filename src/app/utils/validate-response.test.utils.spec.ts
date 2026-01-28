import { zodError } from 'app/data/model/api-Response.model';
import z, { ZodType } from 'zod';

/**
 * Validates an API response against a Zod schema.
 * Asserts that the response is successful and contains non-empty data.
 * If validation fails or data is missing/empty, it triggers a test failure.
 * @template ResponseDataType The expected type of the response data payload.
 * @param response The raw data to validate.
 * @param schema The Zod schema to validate against.
 */
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

/**
 * Creates a standardized Zod schema for API responses.
 * * @template T The type of the data payload.
 * @param dataSchema The Zod schema for the internal 'data' field.
 * @returns A Zod object schema containing success, data, and optional error fields.
 */
export const createApiResponseSchema = <T>(dataSchema: ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: zodError.optional(),
  });

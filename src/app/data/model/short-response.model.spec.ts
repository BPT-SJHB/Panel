import { createApiResponseSchema } from 'app/utils/validate-response.test.utils.spec';

import { z } from 'zod';

export const zodShortResponse = z.object({
  Message: z.string(),
});

export const ApiShortResponseSchema = createApiResponseSchema(zodShortResponse);

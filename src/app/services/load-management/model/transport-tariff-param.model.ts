import { z } from 'zod';

export interface TransportTariffParam {
  TPTPDId: number;
  TPTPTitle: string;
  Cost: number;
  Checked: boolean;
}

export const zodTransportTariffParam = z.object({
  TPTPDId: z.number(),
  TPTPTitle: z.string(),
  Cost: z.number(),
  Checked: z.boolean(),
});

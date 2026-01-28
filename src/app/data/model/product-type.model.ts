import z from 'zod';

export interface Product {
  ProductId: number;
  ProductTitle?: string;
  ProductActive?: boolean;
}

export const zodProduct = z.object({
  ProductId: z.number(),
  ProductTitle: z.string().optional(),
  ProductActive: z.boolean().optional(),
});

export interface ProductType {
  ProductTypeId: number;
  ProductTypeTitle?: string;
  ProductTypeActive?: boolean;
  Products?: Product[];
}

export const zodProductType = z.object({
  ProductTypeId: z.number(),
  ProductTypeTitle: z.string().optional(),
  ProductTypeActive: z.boolean().optional(),
  Products: z.array(zodProduct).optional(),
});

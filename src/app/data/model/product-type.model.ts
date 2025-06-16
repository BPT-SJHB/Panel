import { Product } from './product.model';

export interface ProductType {
  ProductTypeId: number;
  ProductTypeTitle: string;
  ProductTypeActive: boolean;
  Products: Product[];
}

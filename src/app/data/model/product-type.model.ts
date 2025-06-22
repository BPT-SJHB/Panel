export interface ProductType {
  ProductTypeId: number;
  ProductTypeTitle?: string;
  ProductTypeActive?: boolean;
  Products?: Product[];
}

export interface Product {
  ProductId: number;
  ProductTitle?: string;
  ProductActive?: boolean;
}

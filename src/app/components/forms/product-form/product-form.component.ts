import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import {
  TreeTableChangedData,
  TreeTableCheckboxComponent,
} from '../../trees/tree-table-checkbox/tree-table-checkbox.component';
import { ProductType } from 'app/data/model/product-type.model';
import { ProductTypesService } from 'app/services/product-types/product-types.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Subject, takeUntil } from 'rxjs';
import { ErrorCodes } from 'app/constants/error-messages';

export interface ProductParent {
  ProductTypeId: number;
  ProductTypeTitle: string;
  ProductTypeActive: boolean;
}

interface SelectionOption {
  checked: boolean;
  partialChecked?: boolean;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TreeTableModule,
    TreeTableCheckboxComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private productTypeService = inject(ProductTypesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private destroy$ = new Subject<void>();
  private loading: boolean = false;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  products: TreeNode[] = [];
  cachedProducts: TreeNode[] = [];
  selectionKey!: Record<string, SelectionOption>;
  cacheKeyLength: number = 3;
  cachingEnabled: boolean = true;
  startKey: string = '';

  async searchProduct(query: string): Promise<void> {
    if (query.length < this.cacheKeyLength) {
      this.products = [];
      return;
    }

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      if (this.products.length == 0) this.products = [...this.cachedProducts];
      return;
    }

    const response = await this.productTypeService.GetProductsInfo(query);
    if (!this.isSuccessful(response)) return;

    this.startKey = newStartKey;
    this.products = this.convertToTreeNode(response.data!);
    this.cachedProducts = this.products;
  }

  convertToTreeNode(productsType: ProductType[]): TreeNode[] {
    return productsType.map((productType) => ({
      data: {
        ProductTypeId: productType.ProductTypeId,
        ProductTypeTitle: productType.ProductTypeTitle,
        ProductTypeActive: productType.ProductTypeActive,
      },
      children:
        productType.Products?.map((product) => ({
          data: product,
        })) ?? [],
    }));
  }

  async onChangeProduct(change: TreeTableChangedData) {
    if (this.loading) return;

    try {
      this.loadingService.setLoading(true);
      const parent = change.parent;
      const children = change.children;
     
      if (!parent && children.length == 0)
        return;  
      

      // Handle only-child case
      if (!parent && children.length > 0) {
        const { ProductId, ProductActive } = children[0];
        const response = await this.handleProductChange(ProductId, ProductActive);
        if (!this.isSuccessful(response)) return;
        this.toast.success('موفق',response.data?.Message??'');
        return;
      }

      // Handle parent is inactive
      if (!parent.ProductTypeActive) {
        const { ProductTypeId, ProductTypeActive } = parent;
        await this.handleProductTypeChange(ProductTypeId, ProductTypeActive);
        return;
      }

      // Handle parent is active
      if (parent.ProductTypeActive) {
        const requests = children.map(({ ProductId, ProductActive }) =>
          this.handleProductChange(ProductId, ProductActive)
        );
        const results = await Promise.allSettled(requests);

        const firstError = results.find((r) => r.status === 'rejected') as
          | PromiseRejectedResult
          | undefined;

        if (firstError) {
          const error =
            (firstError.reason as any)?.error?.message ??
            'خطای غیرمنتظره‌ای در حذف دسترسی رخ داد';
          this.toast.error('خطا', error);
          await this.updateProductsInfo();
          return;
        }

        const { ProductTypeId, ProductTypeActive } = parent;
        await this.handleProductTypeChange(ProductTypeId, ProductTypeActive);
      }
    } finally {
      this.loadingService.setLoading(false);
    }
  }
  
  private async handleProductTypeChange(
    productTypeId: number,
    active: boolean
  ) {
    const response = await this.productTypeService.ChangeProductTypeStatus(
      productTypeId,
      active
    );
    if (!this.isSuccessful(response)) {
      // await this.updateProductsInfo()
      return;
    };
    this.toast.success('موفق', response.data?.Message ?? '');
  }

  private async handleProductChange(productId: number, active: boolean) {
    const response = await this.productTypeService.ChangeProductStatus(
      productId,
      active
    );
    return response;
  }

  private async updateProductsInfo() {
    if (this.startKey.length < this.cacheKeyLength) {
      return;
    }  
    const productsResponse = await this.productTypeService.GetProductsInfo(
      this.startKey
    );

    if (this.isSuccessful(productsResponse)) {
      this.products = this.convertToTreeNode(productsResponse.data!);
    }
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      console.log(response);
      if (response.error?.code == ErrorCodes.NoRecordFound) {
        
        return true;
      }
      return false;
    }
    return true;
  }
}

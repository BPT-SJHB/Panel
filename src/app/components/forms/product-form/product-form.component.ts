import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import {
  TreeTableChangedData,
  TreeTableCheckboxComponent,
} from '../../trees/tree-table-checkbox/tree-table-checkbox.component';
import { ProductType } from 'app/data/model/product-type.model';
import { ProductTypesService } from 'app/services/product-types/product-types.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ErrorCodes } from 'app/constants/error-messages';
import { AppTitles } from 'app/constants/Titles';
import { ShortResponse } from 'app/data/model/short-response.model';
import { checkAndToastError } from 'app/utils/api-utils';

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
  imports: [ButtonModule, TreeTableModule, TreeTableCheckboxComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private productTypeService = inject(ProductTypesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private destroy$ = new Subject<void>();

  products: TreeNode[] = [];
  cachedProducts: TreeNode[] = [];
  selectionKey!: Record<string, SelectionOption>;

  private loading = false;
  private startKey = '';
  private readonly cacheKeyLength = 3;
  private readonly cachingEnabled = true;

  readonly appTitle = AppTitles;

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async searchProduct(query: string): Promise<void> {
    if (query.length < this.cacheKeyLength) {
      this.products = [];
      return;
    }

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      if (!this.products.length) this.products = [...this.cachedProducts];
      return;
    }

    const response = await this.productTypeService.GetProductsInfo(query);
    if (!this.isSuccessful(response)) return;

    this.startKey = newStartKey;
    this.products = this.convertToTreeNode(response.data!);
    this.cachedProducts = this.products;
  }

  convertToTreeNode(productTypes: ProductType[]): TreeNode[] {
    return productTypes.map((pt) => ({
      data: {
        ProductTypeId: pt.ProductTypeId,
        ProductTypeTitle: pt.ProductTypeTitle,
        ProductTypeActive: pt.ProductTypeActive,
      },
      children: pt.Products?.map((p) => ({ data: p })) ?? [],
    }));
  }

  async onChangeProduct(change: TreeTableChangedData) {
    if (this.loading) return;

    try {
      this.loadingService.setLoading(true);
      const { parent, children } = change;
      const promises: Promise<ApiResponse<ShortResponse>>[] = [];

      if (parent) {
        promises.push(
          this.productTypeService.ChangeProductTypeStatus(
            parent.ProductTypeId,
            parent.ProductTypeActive
          )
        );
      }

      children.forEach(({ ProductId, ProductActive }) =>
        promises.push(
          this.productTypeService.ChangeProductStatus(ProductId, ProductActive)
        )
      );

      const results = await Promise.all(promises);
      let success = results.length > 0;

      results.forEach((r) => {
        if (!checkAndToastError(r, this.toast)) success = false;
      });

      if (!success) return;

      this.toast.success('موفق', results[0].data?.Message ?? '');
      await this.updateProductsInfo();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async updateProductsInfo() {
    if (this.startKey.length < this.cacheKeyLength) return;

    const response = await this.productTypeService.GetProductsInfo(
      this.startKey
    );
    if (this.isSuccessful(response)) {
      this.updateProductTree(response.data!);
    }
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      console.log(response);

      return response.error?.code === ErrorCodes.NoRecordFound;
    }
    return true;
  }

  private updateProductTree(products: ProductType[]) {
    const newNodes = this.convertToTreeNode(products);

    for (const newNode of newNodes) {
      const existingNode = this.products.find(
        (p) => p.data.ProductTypeId === newNode.data.ProductTypeId
      );

      if (existingNode) {
        // update title & active flag
        existingNode.data.ProductTypeTitle = newNode.data.ProductTypeTitle;
        existingNode.data.ProductTypeActive = newNode.data.ProductTypeActive;

        if (!newNode.children) return;

        // update or add children
        for (const newChild of newNode.children) {
          if (!existingNode.children) existingNode.children = [];

          const existingChild = existingNode.children.find(
            (c) => c.data.ProductId === newChild.data.ProductId
          );

          if (existingChild) {
            // update existing child
            Object.assign(existingChild.data, newChild.data);
          } else {
            // add new child
            existingNode.children.push(newChild);
          }
        }

        //remove children that no longer exist
        if (!existingNode.children) return;
        if (existingNode.children.length === newNode.children.length) return;

        existingNode.children = existingNode.children.filter((child) =>
          newNode.children?.some(
            (nChild) => nChild.data.ProductId === child.data.ProductId
          )
        );
      } else {
        // 🔵 add new product type
        this.products.push(newNode);
      }
    }
  }
}

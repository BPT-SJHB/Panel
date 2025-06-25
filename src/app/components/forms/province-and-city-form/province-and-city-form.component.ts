import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  TreeTableChangedData,
  TreeTableCheckboxComponent,
} from 'app/components/trees/tree-table-checkbox/tree-table-checkbox.component';
import { ErrorCodes } from 'app/constants/error-messages';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Province } from 'app/data/model/province-city.model';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ProvinceAndCityManagementService } from 'app/services/province-city-management/province-and-city-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { Subject, takeUntil } from 'rxjs';

interface SelectionOption {
  checked: boolean;
  partialChecked?: boolean;
}

@Component({
  selector: 'app-province-and-city-form',
  imports: [TreeTableModule, TreeTableCheckboxComponent],
  templateUrl: './province-and-city-form.component.html',
  styleUrl: './province-and-city-form.component.scss',
})
export class ProvinceAndCityFormComponent implements OnDestroy, OnInit {
  private provincesAndCitesService = inject(ProvinceAndCityManagementService);
  private toast = inject(ToastService);
  private loadingService = inject(LoadingService);
  private loading = false;
  private destroy$ = new Subject<void>();

  provincesAndCites: TreeNode[] = [];
  cachedProvincesAndCites: TreeNode[] = [];
  selectionKey!: Record<string, SelectionOption>;
  cacheKeyLength: number = 2;
  cachingEnabled: boolean = true;
  startKey: string = '';

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  async searchProvinceAndCity(query: string): Promise<void> {
    if (query.length < this.cacheKeyLength) {
      this.provincesAndCites = [];
      return;
    }

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      if (this.provincesAndCites.length == 0)
        this.provincesAndCites = [...this.cachedProvincesAndCites];
      return;
    }

    const response =
      await this.provincesAndCitesService.GetProvincesAndCitiesInfo(query);
    if (!this.isSuccessful(response)) return;

    this.startKey = newStartKey;
    this.provincesAndCites = this.convertToTreeNode(response.data!);
    this.cachedProvincesAndCites = this.provincesAndCites;
  }

  async onChangeProvinceAndCity(change: TreeTableChangedData) {
    if (this.loading) return;

    try {
      this.loadingService.setLoading(true);
      const parent = change.parent;
      const children = change.children;

      if (!parent && children.length == 0) return;

      // Handle only-child case
      if (!parent && children.length > 0) {
        const { CityCode, CityActive } = children[0];
        const response = await this.handleCityChange(CityCode, CityActive);
        if (!this.isSuccessful(response)) return;
        this.toast.success('موفق', response.data?.Message ?? '');
        return;
      }

      // Handle parent is inactive
      if (!parent.ProvinceActive) {
        const { ProvinceId, ProvinceActive } = parent;
        await this.handleProvinceChange(ProvinceId, ProvinceActive);
        return;
      }

      // Handle parent is active
      if (parent.ProvinceActive) {
        const requests = children.map(({  CityCode, CityActive }) =>
          this.handleCityChange(CityCode, CityActive)
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

        const { ProvinceId, ProvinceActive  } = parent;
        await this. handleProvinceChange(ProvinceId, ProvinceActive );
      }
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async handleProvinceChange(
    provinceId: number,
    active: boolean
  ) {
    const response = await this.provincesAndCitesService.ChangeProvinceStatus(
      provinceId,
      active
    );

    if(!this.isSuccessful(response)) {
      // await this.updateProductsInfo()
      return;
    }
    
    this.toast.success('موفق', response.data?.Message ?? '');
  }

  private async handleCityChange(productId: number, active: boolean) {
    const response = await this.provincesAndCitesService.ChangeCityStatus(
      productId,
      active
    );
    return response;
  }

  private async updateProductsInfo() {
    if (this.startKey.length < this.cacheKeyLength) {
      return;
    }
    const productsResponse = await this.provincesAndCitesService.GetProvincesAndCitiesInfo(
      this.startKey
    );

    if (this.isSuccessful(productsResponse)) {
      this.provincesAndCites = this.convertToTreeNode(productsResponse.data!);
      this.cachedProvincesAndCites = [...this.provincesAndCites]
    }
  }
  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      if (response.error?.code == ErrorCodes.NoRecordFound) {
        return true;
      }
      return false;
    }
    return true;
  }

  private convertToTreeNode(provinces: Province[]): TreeNode[] {
    return provinces.map((province) => ({
      data: {
        ProvinceId: province.ProvinceId,
        ProvinceName: province.ProvinceName,
        ProvinceActive: province.ProvinceActive,
      },
      children:
        province.Cities?.map((city) => ({
          data: city,
        })) ?? [],
    }));
  }
}

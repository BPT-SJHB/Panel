import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { Subject, takeUntil } from 'rxjs';

import {
  TreeTableChangedData,
  TreeTableCheckboxComponent,
} from 'app/components/trees/tree-table-checkbox/tree-table-checkbox.component';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Province, City } from 'app/data/model/province-city.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ProvinceAndCityManagementService } from 'app/services/province-city-management/province-and-city-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { AppTitles } from 'app/constants/Titles';
import { ErrorCodes } from 'app/constants/error-messages';
import { checkAndToastError } from 'app/utils/api-utils';

interface SelectionOption {
  checked: boolean;
  partialChecked?: boolean;
}

@Component({
  selector: 'app-province-and-city-form',
  standalone: true,
  imports: [TreeTableModule, TreeTableCheckboxComponent],
  templateUrl: './province-and-city-form.component.html',
  styleUrls: ['./province-and-city-form.component.scss'],
})
export class ProvinceAndCityFormComponent implements OnInit, OnDestroy {
  private provincesService = inject(ProvinceAndCityManagementService);
  private toast = inject(ToastService);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();
  private loading = false;

  readonly appTitle = AppTitles;

  provinces: TreeNode[] = [];
  cachedProvinces: TreeNode[] = [];
  selectionKey!: Record<string, SelectionOption>;
  private readonly cacheKeyLength = 2;
  private readonly cachingEnabled = true;
  private startKey = '';

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async searchProvinceAndCity(query: string): Promise<void> {
    if (query.length < this.cacheKeyLength) {
      this.provinces = [];
      return;
    }

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      if (!this.provinces.length) this.provinces = [...this.cachedProvinces];
      return;
    }

    const response =
      await this.provincesService.GetProvincesAndCitiesInfo(query);
    if (!this.isSuccessful(response)) return;

    this.startKey = newStartKey;
    this.provinces = this.convertToTreeNode(response.data!);
    this.cachedProvinces = [...this.provinces];
  }

  async onChangeProvinceAndCity(change: TreeTableChangedData) {
    if (this.loading) return;

    const promises: Promise<ApiResponse<ShortResponse>>[] = [];
    const { parent, children } = change;

    try {
      this.loadingService.setLoading(true);

      if (parent) {
        promises.push(
          this.provincesService.ChangeProvinceStatus(
            parent.ProvinceId,
            parent.ProvinceActive
          )
        );
      }

      children.forEach((child) => {
        promises.push(
          this.provincesService.ChangeCityStatus(
            child.CityCode,
            child.CityActive
          )
        );
      });

      const results = await Promise.all(promises);
      let success = results.length > 0;

      results.forEach((r) => {
        if (!checkAndToastError(r, this.toast)) success = false;
      });

      if (!success) return;

      this.toast.success('موفق', results[0].data?.Message ?? '');
      await this.updateProvinceAndCityInfo();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async updateProvinceAndCityInfo() {
    if (this.startKey.length < this.cacheKeyLength) return;

    const response = await this.provincesService.GetProvincesAndCitiesInfo(
      this.startKey
    );
    if (this.isSuccessful(response)) {
      this.updateProvincesTree(response.data!);
      this.cachedProvinces = [...this.provinces];
    }
  }

  private isSuccessful(response: ApiResponse<unknown>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      return response.error?.code === ErrorCodes.NoRecordFound;
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
      children: province.Cities?.map((city: City) => ({ data: city })) ?? [],
    }));
  }

  private updateProvincesTree(newProvinces: Province[]) {
    const newTree = this.convertToTreeNode(newProvinces);

    for (const newNode of newTree) {
      const existingNode = this.provinces.find(
        (p) => p.data.ProvinceId === newNode.data.ProvinceId
      );

      if (existingNode) {
        // update existing province fields
        existingNode.data.ProvinceName = newNode.data.ProvinceName;
        existingNode.data.ProvinceActive = newNode.data.ProvinceActive;

        // update or add cities
        for (const newCityNode of newNode.children ?? []) {
          const existingCityNode = existingNode.children?.find(
            (c) => c.data.CityId === newCityNode.data.CityId
          );

          if (existingCityNode) {
            // update city data
            existingCityNode.data.CityName = newCityNode.data.CityName;
            existingCityNode.data.CityActive = newCityNode.data.CityActive;
          } else {
            // add new city if not exist
            existingNode.children = [
              ...(existingNode.children ?? []),
              newCityNode,
            ];
          }
        }
      } else {
        // add new province if not exist
        this.provinces.push(newNode);
      }
    }
  }
}

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AnnouncementGroup } from '../announcement-group-subgroup-management/model/announcement-group.model';
import { AnnouncementSubGroup } from '../announcement-group-subgroup-management/model/announcement-subgroup.model';
import { LoadStatus } from '../load-management/model/load-status.model';
import { TransportCompany } from '../transport-company-management/model/transport-company-info.model';
import { City } from 'app/data/model/province-city.model';
import { ProvinceAndCityManagementService } from '../province-city-management/province-and-city-management.service';
import { TransportCompaniesManagementService } from '../transport-company-management/transport-companies-management.service';
import { AnnouncementGroupSubgroupManagementService } from '../announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { LoadManagementService } from '../load-management/load-management.service';
import { ToastService } from '../toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { Product, ProductType } from 'app/data/model/product-type.model';
import { LADPlace } from 'app/data/model/lad-place.model';
import { ProductTypesService } from '../product-types/product-types.service';
import { LADPlaceManagementService } from '../lad-place-management/lad-place-management.service';
import { AppTitles } from 'app/constants/Titles';

export enum AutoCompleteType {
  AnnouncementGroup = 'AnnouncementGroup',
  AnnouncementSubGroup = 'AnnouncementSubGroup',
  RelationAnnouncementGroupAndSubGroup = 'RelationAnnouncementGroupAndSubGroup',
  City = 'City',
  LoadStatus = 'LoadStatus',
  TransportCompany = 'TransportCompany',
  Product = 'Product',
  LADPlaces = 'LADPlaces',
}

type CachingMode = 'Focus' | 'CharacterPrefix';

// Map each AutoCompleteType to its corresponding model
interface AutoCompleteTypeMap {
  [AutoCompleteType.AnnouncementGroup]: AnnouncementGroup;
  [AutoCompleteType.AnnouncementSubGroup]: AnnouncementSubGroup;
  [AutoCompleteType.LoadStatus]: LoadStatus;
  [AutoCompleteType.TransportCompany]: TransportCompany;
  [AutoCompleteType.RelationAnnouncementGroupAndSubGroup]: AnnouncementSubGroup;
  [AutoCompleteType.City]: City;
  [AutoCompleteType.Product]: ProductType;
  [AutoCompleteType.LADPlaces]: LADPlace;
}

// Base filter type bound to a specific AutoCompleteType
export interface BaseAutoCompleteFilter<K extends keyof AutoCompleteTypeMap> {
  type: K;
  label: string;
  placeholder: string;
  control: FormControl<string>;
  optionLabel: keyof AutoCompleteTypeMap[K];
  optionValueKey: keyof AutoCompleteTypeMap[K];
  lazySearch: (query: string) => Promise<AutoCompleteTypeMap[K][]>;
  select: (item: AutoCompleteTypeMap[K]) => void;
  valueChange: () => void;
  showIcon: () => boolean;
  readOnly?: () => boolean;
  minLength: number;
  cachingMode: CachingMode;
  groupControlId?: FormControl;
  filter?: (item: AutoCompleteTypeMap[K]) => boolean;
}

// Specific filter types
export type AnnouncementGroupFilter =
  BaseAutoCompleteFilter<AutoCompleteType.AnnouncementGroup>;
export type AnnouncementSubGroupFilter =
  BaseAutoCompleteFilter<AutoCompleteType.AnnouncementSubGroup>;
export type LoadStatusFilter =
  BaseAutoCompleteFilter<AutoCompleteType.LoadStatus>;
export type TransportCompanyFilter =
  BaseAutoCompleteFilter<AutoCompleteType.TransportCompany>;
export type CityFilter = BaseAutoCompleteFilter<AutoCompleteType.City>;
export type RelationAnnouncementGroupAndSubGroupFilter =
  BaseAutoCompleteFilter<AutoCompleteType.RelationAnnouncementGroupAndSubGroup>;
export type LADPlacesFilter =
  BaseAutoCompleteFilter<AutoCompleteType.LADPlaces>;
export type ProductFilter = BaseAutoCompleteFilter<AutoCompleteType.Product>;

// Union of all filters
export type AutoCompleteFilter =
  | AnnouncementGroupFilter
  | AnnouncementSubGroupFilter
  | LoadStatusFilter
  | TransportCompanyFilter
  | CityFilter;

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteConfigFactoryService {
  private readonly fb = inject(FormBuilder);
  private readonly provinceService = inject(ProvinceAndCityManagementService);
  private readonly productService = inject(ProductTypesService);
  private readonly ladPlacesService = inject(LADPlaceManagementService);
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );
  private readonly loadsService = inject(LoadManagementService);
  private readonly toast = inject(ToastService);

  private readonly appTitle = AppTitles;

  private readonly defaultConfigs = {
    [AutoCompleteType.AnnouncementGroup]: {
      type: AutoCompleteType.AnnouncementGroup,
      label: this.appTitle.inputs.loadAnnouncements.loadAnnouncementGroupTitle,
      placeholder: this.appTitle.getPlaceholder('loadAnnouncementGroupTitle'),
      optionLabel: 'AnnouncementTitle' as keyof AnnouncementGroup,
      optionValueKey: 'AnnouncementId' as keyof AnnouncementGroup,
      minLength: 0,
      cachingMode: 'Focus' as const,
    },

    [AutoCompleteType.AnnouncementSubGroup]: {
      type: AutoCompleteType.AnnouncementSubGroup,
      label:
        this.appTitle.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle,
      placeholder: this.appTitle.getPlaceholder(
        'loadAnnouncementSubGroupTitle'
      ),
      optionLabel: 'AnnouncementSGTitle' as keyof AnnouncementSubGroup,
      optionValueKey: 'AnnouncementSGTitle' as keyof AnnouncementSubGroup,
      minLength: 0,
      cachingMode: 'Focus' as const,
    },

    [AutoCompleteType.RelationAnnouncementGroupAndSubGroup]: {
      type: AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
      label:
        this.appTitle.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle,
      placeholder: this.appTitle.getPlaceholder(
        'loadAnnouncementSubGroupTitle'
      ),
      optionLabel: 'AnnouncementSGTitle' as keyof AnnouncementSubGroup,
      optionValueKey: 'AnnouncementSGId' as keyof AnnouncementSubGroup,
      minLength: 0,
      cachingMode: 'Focus' as const,
    },
    [AutoCompleteType.LoadStatus]: {
      type: AutoCompleteType.LoadStatus,
      label: this.appTitle.inputs.loads.loadStatus,
      placeholder: '',
      optionLabel: 'LoadStatusTitle' as keyof LoadStatus,
      optionValueKey: 'LoadStatusId' as keyof LoadStatus,
      minLength: 0,
      cachingMode: 'Focus' as const,
    },

    [AutoCompleteType.TransportCompany]: {
      type: AutoCompleteType.TransportCompany,
      label: this.appTitle.inputs.transportCompanies.transportCompanyTitle,
      placeholder: this.appTitle.getPlaceholder('transportCompanyTitle'),
      optionLabel: 'TCTitle' as keyof TransportCompany,
      optionValueKey: 'TCId' as keyof TransportCompany,
      minLength: 0,
      cachingMode: 'Focus' as const,
    },

    [AutoCompleteType.City]: {
      type: AutoCompleteType.City,
      label: 'شهر',
      placeholder: 'شهر',
      optionLabel: 'CityTitle' as keyof City,
      optionValueKey: 'CityCode' as keyof City,
      minLength: 2,
      cachingMode: 'CharacterPrefix' as const,
    },

    [AutoCompleteType.LADPlaces]: {
      type: AutoCompleteType.LADPlaces,
      label: 'محل بارگیری',
      placeholder: 'محل بارگیری',
      optionLabel: 'LADPlaceTitle' as keyof LADPlace,
      optionValueKey: 'LADPlaceId' as keyof LADPlace,
      minLength: 2,
      cachingMode: 'CharacterPrefix' as const,
    },

    [AutoCompleteType.Product]: {
      type: AutoCompleteType.Product,
      label: this.appTitle.inputs.products.productsTitle,
      placeholder: this.appTitle.getPlaceholder('productsTitle'),
      optionLabel: 'ProductTitle' as keyof Product,
      optionValueKey: 'ProductId' as keyof Product,
      minLength: 2,
      cachingMode: 'CharacterPrefix' as const,
    },
  };

  create<T extends AutoCompleteFilter>(
    type: AutoCompleteType,
    controlId: FormControl,
    overrides: Partial<T> = {}
  ): T {
    const defaultConfig = this.defaultConfigs[type];

    const searchMethod = this.getLazySearch(type, overrides.groupControlId);

    const config = {
      ...defaultConfig,
      control: this.fb.nonNullable.control(''),
      lazySearch: searchMethod,
      select: this.createSelectHandler(type, controlId, defaultConfig),
      valueChange: () => this.onAutoCompleteChange(controlId),
      showIcon: () => controlId.valid,
      readOnly: () => false,
      ...overrides,
    } as T;

    return config;
  }

  private createSelectHandler(
    type: AutoCompleteType,
    controlId: FormControl,
    config: { optionValueKey: string }
  ) {
    switch (type) {
      case AutoCompleteType.AnnouncementGroup:
        return (item: AnnouncementGroup) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof AnnouncementGroup]
          );

      case AutoCompleteType.AnnouncementSubGroup:
        return (item: AnnouncementSubGroup) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof AnnouncementSubGroup]
          );

      case AutoCompleteType.RelationAnnouncementGroupAndSubGroup:
        return (item: AnnouncementSubGroup) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof AnnouncementSubGroup]
          );

      case AutoCompleteType.LoadStatus:
        return (item: LoadStatus) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof LoadStatus]
          );

      case AutoCompleteType.TransportCompany:
        return (item: TransportCompany) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof TransportCompany]
          );

      case AutoCompleteType.City:
        return (item: City) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof City]
          );

      case AutoCompleteType.Product:
        return (item: Product) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof Product]
          );

      case AutoCompleteType.LADPlaces:
        return (item: LADPlace) =>
          this.onSelectAutoCompletion(
            controlId,
            item[config.optionValueKey as keyof LADPlace]
          );

      default:
        throw new Error(`Unsupported AutoCompleteType: ${type}`);
    }
  }

  private getLazySearch(type: AutoCompleteType, groupControlId?: FormControl) {
    switch (type) {
      case AutoCompleteType.AnnouncementGroup:
        return (query: string) => this.getSearchAnnouncementGroup(query);

      case AutoCompleteType.AnnouncementSubGroup:
        return (query: string) => this.getSearchAnnouncementSubGroup(query);

      case AutoCompleteType.LoadStatus:
        return () => this.getSearchLoadStatus();

      case AutoCompleteType.TransportCompany:
        return (query: string) => this.getSearchTransportCompany(query);

      case AutoCompleteType.City:
        return (query: string) => this.getSearchCity(query);

      case AutoCompleteType.RelationAnnouncementGroupAndSubGroup:
        if (!groupControlId) throw new Error(`groupControlId is undefined`);
        return (query: string) =>
          this.getSearchRelationOfAnnouncementGroupAndSubGroup(
            query,
            groupControlId
          );
      case AutoCompleteType.Product:
        return (query: string) => this.getSearchProduct(query);

      case AutoCompleteType.LADPlaces:
        return (query: string) => this.getSearchLadPlace(query);

      default:
        throw new Error(`Unsupported AutoCompleteType: ${type}`);
    }
  }

  // --- Separate search functions remain unchanged ---
  private async getSearchAnnouncementGroup(
    query: string
  ): Promise<AnnouncementGroup[]> {
    const res = await this.announcementService.GetAnnouncementGroups(query);
    return res.data ?? [];
  }

  private async getSearchAnnouncementSubGroup(
    query: string
  ): Promise<AnnouncementSubGroup[]> {
    const res = await this.announcementService.GetAnnouncementSupGroups(query);
    return res.data ?? [];
  }

  private async getSearchLoadStatus(): Promise<LoadStatus[]> {
    const res = await this.loadsService.GetLoadStatuses();
    return res.data ?? [];
  }

  private async getSearchLadPlace(query: string): Promise<LADPlace[]> {
    const res = await this.ladPlacesService.GetLADPlaces(query);
    return res.data ?? [];
  }

  private async getSearchProduct(query: string): Promise<Product[]> {
    const res = await this.productService.GetProductsInfo(query);
    return res.data?.flatMap((pt) => pt.Products ?? []) ?? [];
  }

  private async getSearchTransportCompany(
    query: string
  ): Promise<TransportCompany[]> {
    const res =
      await this.transportCompanyService.GetTransportCompaniesInfo(query);
    return res.data ?? [];
  }

  private async getSearchCity(query: string): Promise<City[]> {
    const res = await this.provinceService.GetProvincesAndCitiesInfo(query);
    return checkAndToastError(res, this.toast)
      ? (res.data?.flatMap((p) => p?.Cities ?? []) ?? [])
      : [];
  }

  private async getSearchRelationOfAnnouncementGroupAndSubGroup(
    query: string,
    groupControlId: FormControl
  ): Promise<AnnouncementSubGroup[]> {
    const res =
      await this.announcementService.GetRelationOfAnnouncementGroupAndSubGroup(
        groupControlId.value
      );

    // Safely access data and AnnouncementSubGroups
    const subGroups = res.data?.[0]?.AnnouncementSubGroups ?? [];

    // Filter by query
    return subGroups.filter((a) => a.AnnouncementSGTitle?.includes(query));
  }

  private onSelectAutoCompletion(controlId: FormControl, value: unknown): void {
    controlId.setValue(value);
  }

  private onAutoCompleteChange(controlId: FormControl): void {
    controlId.setValue(null);
  }
}

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

// --- Models ---
import { AnnouncementGroup } from '../announcement-group-subgroup-management/model/announcement-group.model';
import { AnnouncementSubGroup } from '../announcement-group-subgroup-management/model/announcement-subgroup.model';
import { LoadStatus } from '../load-management/model/load-status.model';
import { TransportCompany } from '../transport-company-management/model/transport-company-info.model';
import {
  City,
  Province,
} from '../province-city-management/model/province-city.model';
import { Product } from 'app/data/model/product-type.model';
import { LADPlace } from 'app/data/model/lad-place.model';
import { DeviceInfo } from '../config-management/model/device-info.model';
import { LoaderType } from '../loader-types/model/loader-type.model';
import { SequentialTurn } from '../sequential-turn-management/model/sequential-turn.model';
import { TPTParamInfo } from '../tpt-params-management/model/tptparam-info.model';

// --- Services ---
import { ProvinceAndCityManagementService } from '../province-city-management/province-and-city-management.service';
import { TransportCompaniesManagementService } from '../transport-company-management/transport-companies-management.service';
import { AnnouncementGroupSubgroupManagementService } from '../announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { LoadManagementService } from '../load-management/load-management.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { LADPlaceManagementService } from '../lad-place-management/lad-place-management.service';
import { ConfigManagementService } from '../config-management/config-management.service';
import { LoaderTypesService } from '../loader-types/loader-types.service';
import { SequentialTurnManagementService } from '../sequential-turn-management/sequential-turn-management.service';
import { TPTParamsManagementService } from '../tpt-params-management/tptparams-management.service';
import { ToastService } from '../toast-service/toast.service';

// --- Utilities ---
import { checkAndToastError } from 'app/utils/api-utils';
import { AppTitles } from 'app/constants/Titles';
import { Driver_TruckManagementService } from '../driver-truck-management/driver-truck-management.service';
import { TruckNativenessType } from '../driver-truck-management/model/truck-nativeness-info.model';
import { RequesterInfo } from '../config-management/model/requester-info.model';
import { TurnStatus } from '../turn-management/model/turn-status.model';
import { TurnManagementService } from '../turn-management/turn-management.service';

// --- AutoComplete Types ---
export enum AutoCompleteType {
  AnnouncementGroup = 'AnnouncementGroup',
  AnnouncementSubGroup = 'AnnouncementSubGroup',
  RelationAnnouncementGroupAndSubGroup = 'RelationAnnouncementGroupAndSubGroup',
  Province = 'Province',
  City = 'City',
  LoadStatus = 'LoadStatus',
  TransportCompany = 'TransportCompany',
  Product = 'Product',
  LADPlaces = 'LADPlaces',
  Devices = 'Devices',
  LoaderType = 'LoaderType',
  SequentialTurn = 'SequentialTurn',
  TPTParams = 'TPTParams',
  NativenessType = 'NativenessType',
  TurnStatus = 'TurnStatus',
  RequesterInfo = 'RequesterInfo',
}

type CachingMode = 'Focus' | 'CharacterPrefix';

// --- AutoComplete Type Mapping ---
export interface AutoCompleteTypeMap {
  [AutoCompleteType.AnnouncementGroup]: AnnouncementGroup;
  [AutoCompleteType.AnnouncementSubGroup]: AnnouncementSubGroup;
  [AutoCompleteType.LoadStatus]: LoadStatus;
  [AutoCompleteType.TransportCompany]: TransportCompany;
  [AutoCompleteType.RelationAnnouncementGroupAndSubGroup]: AnnouncementSubGroup;
  [AutoCompleteType.Province]: Province;
  [AutoCompleteType.City]: City;
  [AutoCompleteType.Product]: Product;
  [AutoCompleteType.LADPlaces]: LADPlace;
  [AutoCompleteType.Devices]: DeviceInfo;
  [AutoCompleteType.LoaderType]: LoaderType;
  [AutoCompleteType.SequentialTurn]: SequentialTurn;
  [AutoCompleteType.TPTParams]: TPTParamInfo;
  [AutoCompleteType.NativenessType]: TruckNativenessType;
  [AutoCompleteType.TurnStatus]: TurnStatus;
  [AutoCompleteType.RequesterInfo]: RequesterInfo;
}

// --- Base Filter ---
export interface BaseAutoCompleteFilter<K extends keyof AutoCompleteTypeMap> {
  type: K;
  label: string;
  placeholder: string;
  control: FormControl<string>;
  optionLabel: keyof AutoCompleteTypeMap[K];
  optionValueKey: keyof AutoCompleteTypeMap[K];
  lazySearch: (query?: string) => Promise<AutoCompleteTypeMap[K][]>;
  select: (item: AutoCompleteTypeMap[K]) => void;
  valueChange: () => void;
  showIcon: () => boolean;
  readOnly?: () => boolean;
  minLength: number;
  cachingMode: CachingMode;
  groupControlId?: FormControl;
  filter?: (item: AutoCompleteTypeMap[K]) => boolean;
}

interface BaseConfig<K extends AutoCompleteType> {
  type: K;
  optionValueKey: keyof AutoCompleteTypeMap[K];
  optionLabel: keyof AutoCompleteTypeMap[K];
  label: string;
  placeholder: string;
  minLength: number;
  cachingMode: CachingMode;
  lazySearch: (query: string) => Promise<AutoCompleteTypeMap[K][]>;
}

// --- Service ---
@Injectable({ providedIn: 'root' })
export class AutoCompleteConfigFactoryService {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  // --- Injected Domain Services ---
  private services = {
    province: inject(ProvinceAndCityManagementService),
    product: inject(ProductTypesService),
    lad: inject(LADPlaceManagementService),
    turn: inject(TurnManagementService),
    seqTurn: inject(SequentialTurnManagementService),
    config: inject(ConfigManagementService),
    company: inject(TransportCompaniesManagementService),
    announce: inject(AnnouncementGroupSubgroupManagementService),
    loads: inject(LoadManagementService),
    loaderType: inject(LoaderTypesService),
    tpt: inject(TPTParamsManagementService),
    truckDriver: inject(Driver_TruckManagementService),
  };

  private readonly appTitle = AppTitles;

  private readonly defaultConfigs: {
    [K in AutoCompleteType]: BaseConfig<K>;
  } = {
    [AutoCompleteType.AnnouncementGroup]: {
      type: AutoCompleteType.AnnouncementGroup,
      label: this.appTitle.inputs.loadAnnouncements.loadAnnouncementGroupTitle,
      placeholder: this.appTitle.getPlaceholder('loadAnnouncementGroupTitle'),
      optionLabel: 'AnnouncementTitle',
      optionValueKey: 'AnnouncementId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: (query: string) => this.getSearchAnnouncementGroup(query),
    },
    [AutoCompleteType.AnnouncementSubGroup]: {
      type: AutoCompleteType.AnnouncementSubGroup,
      label:
        this.appTitle.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle,
      placeholder: this.appTitle.getPlaceholder(
        'loadAnnouncementSubGroupTitle'
      ),
      optionLabel: 'AnnouncementSGTitle',
      optionValueKey: 'AnnouncementSGTitle',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: (query: string) => this.getSearchAnnouncementSubGroup(query),
    },
    [AutoCompleteType.RelationAnnouncementGroupAndSubGroup]: {
      type: AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
      label:
        this.appTitle.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle,
      placeholder: this.appTitle.getPlaceholder(
        'loadAnnouncementSubGroupTitle'
      ),
      optionLabel: 'AnnouncementSGTitle',
      optionValueKey: 'AnnouncementSGId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: (query: string, groupControlId?: FormControl) =>
        this.getSearchRelationOfAnnouncementGroupAndSubGroup(
          query,
          groupControlId
        ),
    },
    [AutoCompleteType.LoadStatus]: {
      type: AutoCompleteType.LoadStatus,
      label: this.appTitle.inputs.loads.loadStatus,
      placeholder: this.appTitle.getPlaceholder('loadStatus'),
      optionLabel: 'LoadStatusTitle',
      optionValueKey: 'LoadStatusId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: () => this.getSearchLoadStatus(),
    },
    [AutoCompleteType.Devices]: {
      type: AutoCompleteType.Devices,
      label: 'دیوایس',
      placeholder: 'دیوایس',
      optionLabel: 'DeviceTitle',
      optionValueKey: 'DeviceId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: () => this.getSearchDevices(),
    },
    [AutoCompleteType.LoaderType]: {
      type: AutoCompleteType.LoaderType,
      label: 'بارگیر',
      placeholder: 'بارگیر',
      optionLabel: 'LoaderTypeTitle',
      optionValueKey: 'LoaderTypeId',
      minLength: 2,
      cachingMode: 'Focus',
      lazySearch: (query: string) => this.getSearchLoaderType(query),
    },
    [AutoCompleteType.SequentialTurn]: {
      type: AutoCompleteType.SequentialTurn,
      label: this.appTitle.inputs.sequentialTurns.sequentialTurnTitle,
      placeholder: this.appTitle.getPlaceholder('sequentialTurnTitle'),
      optionLabel: 'SeqTurnTitle',
      optionValueKey: 'SeqTurnId',
      minLength: 2,
      cachingMode: 'Focus',
      lazySearch: (query: string) => this.getSearchSequentialTurn(query),
    },
    [AutoCompleteType.TransportCompany]: {
      type: AutoCompleteType.TransportCompany,
      label: this.appTitle.inputs.transportCompanies.transportCompanyTitle,
      placeholder: this.appTitle.getPlaceholder('transportCompanyTitle'),
      optionLabel: 'TCTitle',
      optionValueKey: 'TCId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: (query: string) => this.getSearchTransportCompany(query),
    },
    [AutoCompleteType.TPTParams]: {
      type: AutoCompleteType.TPTParams,
      label: 'پارامتر های موثر',
      placeholder: 'پارامتر های موثر',
      optionLabel: 'TPTPTitle',
      optionValueKey: 'TPTPId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: () => this.getSearchTPTParams(),
    },
    [AutoCompleteType.NativenessType]: {
      type: AutoCompleteType.NativenessType,
      label: 'بومی/غیربومی',
      placeholder: 'بومی/غیربومی',
      optionLabel: 'TruckNativenessTypeTitle',
      optionValueKey: 'TruckNativenessTypeId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: () => this.getSearchNativeness(),
    },
    [AutoCompleteType.City]: {
      type: AutoCompleteType.City,
      label: 'شهر',
      placeholder: 'شهر',
      optionLabel: 'CityTitle',
      optionValueKey: 'CityCode',
      minLength: 2,
      cachingMode: 'CharacterPrefix',
      lazySearch: (query: string) => this.getSearchCity(query),
    },
    [AutoCompleteType.Province]: {
      type: AutoCompleteType.Province,
      label: 'استان',
      placeholder: 'استان',
      optionLabel: 'ProvinceName',
      optionValueKey: 'ProvinceId',
      minLength: 2,
      cachingMode: 'CharacterPrefix',
      lazySearch: (query: string) => this.getSearchProvince(query),
    },
    [AutoCompleteType.TurnStatus]: {
      type: AutoCompleteType.TurnStatus,
      label: 'وضعیت نوبت',
      placeholder: 'وضعیت نوبت',
      optionLabel: 'TurnStatusTitle',
      optionValueKey: 'TurnStatusId',
      minLength: 0,
      cachingMode: 'Focus',
      lazySearch: () => this.getSearchTurnStatus(),
    },
    [AutoCompleteType.LADPlaces]: {
      type: AutoCompleteType.LADPlaces,
      label: 'محل بارگیری',
      placeholder: 'محل بارگیری',
      optionLabel: 'LADPlaceTitle',
      optionValueKey: 'LADPlaceId',
      minLength: 2,
      cachingMode: 'CharacterPrefix',
      lazySearch: (query: string) => this.getSearchLadPlace(query),
    },
    [AutoCompleteType.Product]: {
      type: AutoCompleteType.Product,
      label: this.appTitle.inputs.products.productsTitle,
      placeholder: this.appTitle.getPlaceholder('productsTitle'),
      optionLabel: 'ProductTitle',
      optionValueKey: 'ProductId',
      minLength: 2,
      cachingMode: 'CharacterPrefix',
      lazySearch: (query: string) => this.getSearchProduct(query),
    },
    [AutoCompleteType.RequesterInfo]: {
      type: AutoCompleteType.RequesterInfo,
      label: 'محل درخواست',
      placeholder: 'محل درخواست',
      optionLabel: 'RequesterTitle',
      optionValueKey: 'RequesterId',
      minLength: 2,
      cachingMode: 'CharacterPrefix',
      lazySearch: () => this.getSearchRequsterInfo(),
    },
  };

  // --- Search functions ---
  private async getSearchAnnouncementGroup(
    query: string
  ): Promise<AnnouncementGroup[]> {
    const res = await this.services.announce.GetAnnouncementGroups(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchAnnouncementSubGroup(
    query: string
  ): Promise<AnnouncementSubGroup[]> {
    const res = await this.services.announce.GetAnnouncementSupGroups(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchLoadStatus(): Promise<LoadStatus[]> {
    const res = await this.services.loads.GetLoadStatuses();
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchLoaderType(query: string): Promise<LoaderType[]> {
    const res = await this.services.loaderType.GetLoaderTypesInfo(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchLadPlace(query: string): Promise<LADPlace[]> {
    const res = await this.services.lad.GetLADPlaces(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchProduct(query: string): Promise<Product[]> {
    const res = await this.services.product.GetProductsInfo(query);
    return checkAndToastError(res, this.toast)
      ? (res.data?.flatMap((pt) => pt.Products ?? []) ?? [])
      : [];
  }

  private async getSearchTransportCompany(
    query: string
  ): Promise<TransportCompany[]> {
    const res = await this.services.company.GetTransportCompaniesInfo(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchDevices(): Promise<DeviceInfo[]> {
    const res = await this.services.config.GetAllOfDevices();
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchSequentialTurn(
    query: string
  ): Promise<SequentialTurn[]> {
    const res = await this.services.seqTurn.GetSequentialTurns(query);
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchTPTParams(): Promise<TPTParamInfo[]> {
    const res = await this.services.tpt.GetAllTPTParams();
    return checkAndToastError(res, this.toast) ? (res.data ?? []) : [];
  }

  private async getSearchTurnStatus(): Promise<TurnStatus[]> {
    const res = await this.services.turn.GetAllTurnStatus();
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data;
  }

  private async getSearchNativeness(): Promise<TruckNativenessType[]> {
    const res = await this.services.truckDriver.GetTruckNativenessTypes();
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data ?? [];
  }

  private async getSearchCity(query: string): Promise<City[]> {
    const res = await this.services.province.GetProvincesAndCitiesInfo(query);
    return checkAndToastError(res, this.toast)
      ? (res.data?.flatMap((p) => p?.Cities ?? []) ?? [])
      : [];
  }

  private async getSearchProvince(query: string): Promise<Province[]> {
    const res = await this.services.province.GetAllProvinces(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data?.map((p) => ({ ...p, Cities: undefined })) ?? [];
  }

  private async getSearchRelationOfAnnouncementGroupAndSubGroup(
    query: string,
    groupControlId?: FormControl
  ): Promise<AnnouncementSubGroup[]> {
    if (!groupControlId) throw new Error('groupControlId is undefined');

    const res =
      await this.services.announce.GetRelationOfAnnouncementGroupAndSubGroup(
        groupControlId.value
      );
    const subGroups = checkAndToastError(res, this.toast)
      ? (res.data?.[0]?.AnnouncementSubGroups ?? [])
      : [];
    return subGroups.filter((a) => a.AnnouncementSGTitle?.includes(query));
  }

  private async getSearchRequsterInfo(): Promise<RequesterInfo[]> {
    const res = await this.services.config.GetAllRequesters();
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data ?? [];
  }

  // --- Public create method ---
  create<K extends keyof AutoCompleteTypeMap>(
    type: K,
    controlId: FormControl,
    overrides: Partial<BaseAutoCompleteFilter<K>> = {}
  ): BaseAutoCompleteFilter<K> {
    const defaultConfig = this.defaultConfigs[type];

    if (type === AutoCompleteType.RelationAnnouncementGroupAndSubGroup) {
      const groupControl = overrides.groupControlId;
      const lazy: BaseAutoCompleteFilter<AutoCompleteType.RelationAnnouncementGroupAndSubGroup>['lazySearch'] =
        async (query?: string) => {
          return this.getSearchRelationOfAnnouncementGroupAndSubGroup(
            query!,
            groupControl
          );
        };

      defaultConfig.lazySearch =
        lazy as BaseAutoCompleteFilter<K>['lazySearch'];
    }

    const config: BaseAutoCompleteFilter<K> = {
      ...defaultConfig,
      control: this.fb.nonNullable.control(''),
      select: this.createSelectHandler<K>(
        controlId,
        defaultConfig.optionValueKey
      ),
      valueChange: () => this.onAutoCompleteChange(controlId),
      showIcon: () => controlId.valid,
      readOnly: () => false,
      ...overrides,
    };

    return config;
  }

  // --- Create select handler ---
  private createSelectHandler<T extends AutoCompleteType>(
    controlId: FormControl,
    key: string | number | symbol
  ) {
    return (item: AutoCompleteTypeMap[T]) => {
      const value = item[key as keyof AutoCompleteTypeMap[T]];
      this.onSelectAutoCompletion(controlId, value);
    };
  }

  // --- Helper Methods ---
  private onSelectAutoCompletion(controlId: FormControl, value: unknown): void {
    controlId.setValue(value);
  }

  private onAutoCompleteChange(controlId: FormControl): void {
    controlId.setValue(null);
  }
}

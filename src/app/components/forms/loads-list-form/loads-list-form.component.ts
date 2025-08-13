import {
  AfterViewInit,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { CheckboxInputComponent } from 'app/components/shared/inputs/checkbox-input/checkbox-input.component';

import { BaseLoading } from '../shared/component-base/base-loading';
import { City } from 'app/data/model/province-city.model';
import { checkAndToastError } from 'app/utils/api-utils';

import { ProvinceAndCityManagementService } from 'app/services/province-city-management/province-and-city-management.service';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';

import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { AnnouncementGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-group.model';
import { AnnouncementSubGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-subgroup.model';
import { LoadStatus } from 'app/services/load-management/model/load-status.model';
import { takeUntil } from 'rxjs';
import { TransportCompany } from 'app/services/transport-company-management/model/transport-company-info.model';

interface LoadTransportCompaniesTable {
  ProvinceId: number;
  ProvinceName: string;
  LoadId: number;
  TCTitle: string;
  GoodTitle: string;
  Tonaj: number;
  SoureCityTitle: string;
  TargetCityTitle: string;
  LoadingPlaceTitle: string;
  DischargingPlaceTitle: string;
  Total: number;
  Reminder: number;
  Tariff: string;
  LoadStatusName: string;
  AnnounceDate: string;
  AnnounceTime: string;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  Recipient: string;
  Address: string;
  Description: string;
  UserName: string;
  TPTParamsJoint: string;
}

interface LoadFilter {
  announceGroupId: number | null;
  announceSubgroupId: number | null;
  announceSubgroupTitle: string;
  date: string | null;
  transportCompanyId: number | null;
  loadsStatusId: number | null;
  sourceCityId: number | null;
  targetCityId: number | null;
  inventory: boolean;
  transportCompanyTitle: string;
}

interface LoadTransportCompaniesTable {
  ProvinceId: number;
  ProvinceName: string;
  LoadId: number;
  TCTitle: string;
  GoodTitle: string;
  Tonaj: number;
  SoureCityTitle: string;
  TargetCityTitle: string;
  LoadingPlaceTitle: string;
  DischargingPlaceTitle: string;
  Total: number;
  Reminder: number;
  Tariff: string;
  LoadStatusName: string;
  AnnounceDate: string;
  AnnounceTime: string;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  Recipient: string;
  Address: string;
  Description: string;
  UserName: string;
  TPTParamsJoint: string;
}

export enum LoadListType {
  TRANSPORT_COMPANY = 'TRANSPORT_COMPANY',
}

interface LoadFilter {
  announceGroupId: number | null;
  announceSubgroupId: number | null;
  announceSubgroupTitle: string;
  date: string | null;
  transportCompanyId: number | null;
  loadsStatusId: number | null;
  sourceCityId: number | null;
  targetCityId: number | null;
  inventory: boolean;
  transportCompanyTitle: string;
}

interface BaseAutoCompleteFilter {
  label: string;
  placeholder: string;
  minLength: number;
  cachingMode: 'Focus' | 'CharacterPrefix';
  control: FormControl<string>;
  valueChange: () => void;
  showIcon: () => boolean;
  readOnly?: () => boolean;
}

interface AnnouncementGroupFilter extends BaseAutoCompleteFilter {
  type: 'announcementGroup';
  optionLabel: keyof AnnouncementGroup;
  select: (e: AnnouncementGroup) => void;
  lazySearch: (query: string) => Promise<AnnouncementGroup[]>;
}

interface AnnouncementSubGroupFilter extends BaseAutoCompleteFilter {
  type: 'announcementSubGroup';
  optionLabel: keyof AnnouncementSubGroup;
  select: (e: AnnouncementSubGroup) => void;
  lazySearch: (query: string) => Promise<AnnouncementSubGroup[]>;
}

interface LoadStatusFilter extends BaseAutoCompleteFilter {
  type: 'loadStatus';
  optionLabel: keyof LoadStatus;
  select: (e: LoadStatus) => void;
  lazySearch: (query: string) => Promise<LoadStatus[]>;
}

interface TransportCompanyFilter extends BaseAutoCompleteFilter {
  type: 'transportCompany';
  optionLabel: keyof TransportCompany;
  select: (e: TransportCompany) => void;
  lazySearch: (query: string) => Promise<TransportCompany[]>;
}

interface CityFilter extends BaseAutoCompleteFilter {
  type: 'city';
  optionLabel: keyof City;
  select: (e: City) => void;
  lazySearch: (query: string) => Promise<City[]>;
}

type AutoCompleteFilter =
  | AnnouncementGroupFilter
  | AnnouncementSubGroupFilter
  | LoadStatusFilter
  | TransportCompanyFilter
  | CityFilter;

@Component({
  selector: 'app-loads-list-form',
  imports: [
    SearchAutoCompleteComponent,
    DatePickerInput,
    TableComponent,
    ButtonComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './loads-list-form.component.html',
  styleUrls: ['./loads-list-form.component.scss'],
})
export class LoadsListFormComponent
  extends BaseLoading
  implements AfterViewInit
{
  readonly loadType = LoadListType.TRANSPORT_COMPANY;
  readonly addonWidth = '10rem';

  shearedSignal!: WritableSignal<null | LoadInfo>;
  rows = signal<LoadTransportCompaniesTable[]>([]);

  readonly fb = inject(FormBuilder);
  private readonly loadsService = inject(LoadManagementService);
  private readonly provinceService = inject(ProvinceAndCityManagementService);
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );

  ngAfterViewInit(): void {
    this.initializeLoads();
    this.getLoadFilterControl('date')?.setValue(null);
  }

  override ngOnInit(): void {
    this.getLoadFilterControl('announceGroupId')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value) {
          this.getLoadFilterControl('announceSubgroupId').setValue(-1);
          this.getLoadFilterControl('announceSubgroupTitle').setValue('');
        }
      });
    super.ngOnInit();
  }

  readonly columns: TableColumn<LoadTransportCompaniesTable>[] = [
    { header: 'استان', field: 'ProvinceName' },
    { header: 'شناسه بار', field: 'LoadId' },
    { header: 'عنوان شرکت حمل و نقل', field: 'TCTitle' },
    { header: 'عنوان کالا', field: 'GoodTitle' },
    { header: 'تناژ', field: 'Tonaj', class: 'font-bold' },
    { header: 'شهر مبدا', field: 'SoureCityTitle' },
    { header: 'شهر مقصد', field: 'TargetCityTitle' },
    { header: 'مبدا بارگیری', field: 'LoadingPlaceTitle' },
    { header: 'مقصد تخلیه', field: 'DischargingPlaceTitle' },
    { header: 'کل', field: 'Total', class: 'text-right' },
    { header: 'باقی مانده', field: 'Reminder', class: 'text-right' },
    { header: 'تعرفه', field: 'Tariff' },
    { header: 'وضعیت بار', field: 'LoadStatusName' },
    { header: 'تاریخ اعلام', field: 'AnnounceDate' },
    { header: 'زمان اعلام', field: 'AnnounceTime' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'گیرنده', field: 'Recipient' },
    { header: 'آدرس', field: 'Address' },
    { header: 'توضیحات', field: 'Description' },
    { header: 'نام کاربر', field: 'UserName' },
    { header: 'پارامترهای موثر', field: 'TPTParamsJoint' },
  ];

  readonly searchAnnouncementGroup = async (query: string) =>
    (await this.announcementService.GetAnnouncementGroups(query)).data ?? [];

  readonly searchAnnouncementSubGroup = async (query: string) =>
    (await this.announcementService.GetAnnouncementSupGroups(query)).data ?? [];

  readonly searchLoadStatus = async () =>
    (await this.loadsService.GetLoadStatuses()).data ?? [];

  readonly searchTransportComponey = async (query: string) =>
    (await this.transportCompanyService.GetTransportCompaniesInfo(query))
      .data ?? [];

  readonly onSearchCity = async (query: string): Promise<City[]> => {
    const res = await this.provinceService.GetProvincesAndCitiesInfo(query);
    return checkAndToastError(res, this.toast)
      ? (res.data?.flatMap((p) => p?.Cities ?? []) ?? [])
      : [];
  };

  readonly loadFilterForm = this.fb.group({
    announceGroupId: this.fb.control<number | null>(null, Validators.required),
    announceSubgroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    announceSubgroupTitle: this.fb.nonNullable.control('', Validators.required),
    date: this.fb.control<number | null>(null, Validators.required),
    loadsStatusId: this.fb.control<number | null>(null, Validators.required),
    sourceCityId: this.fb.control<number | null>(null, Validators.required),
    targetCityId: this.fb.control<number | null>(null, Validators.required),
    transportCompanyId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    inventory: this.fb.nonNullable.control(false, Validators.required),
    transportCompanyTitle: this.fb.nonNullable.control(''),
  });

  readonly autoCompletions: AutoCompleteFilter[] = [
    {
      type: 'announcementGroup',
      label: 'گروه اعلام بار',
      placeholder: 'گروه اعلام بار',
      optionLabel: 'AnnouncementTitle',
      control: this.fb.nonNullable.control(''),
      select: (e: AnnouncementGroup) =>
        this.onSelectAutoCompletion('announceGroupId', e.AnnouncementId),
      valueChange: () => this.onAutoCompleteChange('announceGroupId'),
      lazySearch: this.searchAnnouncementGroup,
      showIcon: () => this.getLoadFilterControl('announceGroupId').valid,
      minLength: 0,
      cachingMode: 'Focus',
    },
    {
      type: 'announcementSubGroup',
      label: 'زیرگروه اعلام بار',
      placeholder: 'زیرگروه اعلام بار',
      optionLabel: 'AnnouncementSGTitle',
      control: this.getLoadFilterControl('announceSubgroupTitle'),
      select: (e: AnnouncementSubGroup) =>
        this.onSelectAutoCompletion('announceSubgroupId', e.AnnouncementSGId),
      valueChange: () => this.onAutoCompleteChange('announceSubgroupId'),
      lazySearch: this.searchAnnouncementSubGroup,
      showIcon: () => this.getLoadFilterControl('announceSubgroupId').valid,
      readOnly: () => this.getLoadFilterControl('announceGroupId').invalid,
      minLength: 0,
      cachingMode: 'Focus',
    },
    {
      type: 'loadStatus',
      label: 'وضعیت بار',
      placeholder: 'وضعیت بار',
      optionLabel: 'LoadStatusTitle',
      control: this.fb.nonNullable.control(''),
      select: (e: LoadStatus) =>
        this.onSelectAutoCompletion('loadsStatusId', e.LoadStatusId),
      valueChange: () => this.onAutoCompleteChange('loadsStatusId'),
      lazySearch: this.searchLoadStatus,
      showIcon: () => this.getLoadFilterControl('loadsStatusId').valid,
      minLength: 0,
      cachingMode: 'Focus',
    },
    {
      type: 'transportCompany',
      label: 'شرکت حمل ونقل',
      placeholder: 'شرکت حمل ونقل',
      optionLabel: 'TCTitle',
      control: this.getLoadFilterControl('transportCompanyTitle'),
      select: (e: TransportCompany) =>
        this.onSelectAutoCompletion('transportCompanyId', e.TCId),
      valueChange: () => this.onAutoCompleteChange('transportCompanyId'),
      lazySearch: this.searchTransportComponey,
      readOnly: () => this.isTransportCompanyInputReadOnly(),
      showIcon: () => this.getLoadFilterControl('transportCompanyId').valid,
      minLength: 0,
      cachingMode: 'Focus',
    },
    {
      type: 'city',
      label: 'شهر مبدا',
      placeholder: 'شهر مبدا',
      optionLabel: 'CityTitle',
      control: this.fb.nonNullable.control(''),
      select: (e: City) =>
        this.onSelectAutoCompletion('sourceCityId', e.CityCode),
      valueChange: () => this.onAutoCompleteChange('sourceCityId'),
      lazySearch: this.onSearchCity,
      showIcon: () => this.getLoadFilterControl('sourceCityId').valid,
      minLength: 2,
      cachingMode: 'CharacterPrefix',
    },
    {
      type: 'city',
      label: 'شهر مقصد',
      placeholder: 'شهر مقصد',
      optionLabel: 'CityTitle',
      control: this.fb.nonNullable.control(''),
      select: (e: City) =>
        this.onSelectAutoCompletion('targetCityId', e.CityCode),
      valueChange: () => this.onAutoCompleteChange('targetCityId'),
      lazySearch: this.onSearchCity,
      showIcon: () => this.getLoadFilterControl('targetCityId').valid,
      minLength: 2,
      cachingMode: 'CharacterPrefix',
    },
  ];

  async filterListLoad(): Promise<void> {
    if (this.loading() || this.isFilterInvalid()) return;

    const filter = this.extractFilterFormData();
    await this.withLoading(async () => {
      const response = await this.loadsService.GetLoadsForTransportCompanies(
        filter.transportCompanyId ?? 0,
        filter.announceGroupId,
        filter.announceSubgroupId,
        filter.inventory,
        filter.date,
        filter.loadsStatusId,
        filter.sourceCityId,
        filter.targetCityId
      );

      if (!checkAndToastError(response, this.toast)) {
        this.rows.set([]);
        return;
      }
      this.rows.set(
        response.data.flatMap((l) =>
          l.myLoads.map((c) => ({ ProvinceName: l.ProvinceName, ...c }))
        )
      );
    });
  }

  rowSelect(row: LoadTransportCompaniesTable): void {
    this.shearedSignal.set(row as LoadInfo);
  }

  onSelectAutoCompletion(control: keyof LoadFilter, value: number): void {
    this.getLoadFilterControl(control).setValue(value);
  }

  onAutoCompleteChange(control: keyof LoadFilter): void {
    this.getLoadFilterControl(control).setValue(null);
  }

  isFilterInvalid(): boolean {
    const required: (keyof LoadFilter)[] = [
      'transportCompanyId',
      'announceGroupId',
      'announceSubgroupId',
      'date',
      'loadsStatusId',
      'sourceCityId',
      'targetCityId',
    ];
    return required.every((c) => this.getLoadFilterControl(c).invalid);
  }

  isTransportCompanyInputReadOnly(): boolean {
    return this.loadType === LoadListType.TRANSPORT_COMPANY;
  }

  getLoadFilterControl<K extends keyof LoadFilter>(
    name: K
  ): FormControl<LoadFilter[K]> {
    const control = this.loadFilterForm.get(name as string);
    if (!control) throw new Error(`Control "${String(name)}" not found`);
    return control as FormControl<LoadFilter[K]>;
  }

  private async initializeLoads() {
    await this.withLoading(async () => {
      const response =
        await this.transportCompanyService.GetTransportCompanyBySoftwareUser();
      if (!checkAndToastError(response, this.toast)) return;
      this.getLoadFilterControl('transportCompanyTitle').setValue(
        response.data.TCTitle ?? ''
      );

      this.getLoadFilterControl('transportCompanyId').setValue(
        response.data.TCId
      );
    });

    await this.filterListLoad();
  }

  private extractFilterFormData() {
    return {
      transportCompanyId:
        this.getLoadFilterControl('transportCompanyId').value ?? undefined,
      announceGroupId:
        this.getLoadFilterControl('announceGroupId').value ?? undefined,
      announceSubgroupId:
        this.getLoadFilterControl('announceSubgroupId').value ?? undefined,
      date: this.getLoadFilterControl('date').value ?? undefined,
      loadsStatusId:
        this.getLoadFilterControl('loadsStatusId').value ?? undefined,
      sourceCityId:
        this.getLoadFilterControl('sourceCityId').value ?? undefined,
      targetCityId:
        this.getLoadFilterControl('targetCityId').value ?? undefined,
      inventory: this.getLoadFilterControl('inventory').value,
    };
  }
}

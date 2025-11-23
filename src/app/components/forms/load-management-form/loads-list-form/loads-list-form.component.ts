import {
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import {
  TableComponent,
  TableColumn,
} from 'app/components/shared/table/table.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { CheckboxInputComponent } from 'app/components/shared/inputs/checkbox-input/checkbox-input.component';

import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';

import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteFilter,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { AppTitles } from 'app/constants/Titles';

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
  ADMIN = 'ADMIN',
  FACTORIES_PRODUCTION_CENTERS = 'FACTORIES_PRODUCTION_CENTERS',
}

@Component({
  selector: 'app-loads-list-form',
  imports: [
    SearchAutoCompleteFactoryComponent,
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
  implements OnViewActivated
{
  @ViewChild(TableComponent) table?: TableComponent<LoadInfo>;

  readonly loadType: LoadListType = LoadListType.TRANSPORT_COMPANY;
  readonly addonWidth = '8rem';
  readonly appTitle = AppTitles;

  sharedSignal!: WritableSignal<null | LoadInfo>;
  rows = signal<LoadTransportCompaniesTable[]>([]);

  private readonly fb = inject(FormBuilder);
  private readonly loadsService = inject(LoadManagementService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );

  readonly loadFilterForm = this.fb.group({
    announceGroupId: this.fb.control<number | null>(null, Validators.required),
    announceSubgroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    announceSubgroupTitle: this.fb.nonNullable.control('', Validators.required),
    date: this.fb.control<string | null>(null, Validators.required),
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

  readonly columns: TableColumn<LoadTransportCompaniesTable>[] = [
    { header: this.appTitle.tables.loads.loadProvince, field: 'ProvinceName' },
    { header: this.appTitle.tables.loads.loadId, field: 'LoadId' },
    { header: this.appTitle.tables.loads.transportCompany, field: 'TCTitle' },
    { header: this.appTitle.tables.loads.product, field: 'GoodTitle' },
    {
      header: this.appTitle.tables.loads.loadSize,
      field: 'Tonaj',
      class: 'font-bold',
    },
    { header: this.appTitle.tables.loads.sourceCity, field: 'SoureCityTitle' },
    { header: this.appTitle.tables.loads.targetCity, field: 'TargetCityTitle' },
    {
      header: this.appTitle.tables.loads.loadingPlace,
      field: 'LoadingPlaceTitle',
    },
    {
      header: this.appTitle.tables.loads.dischargingPlace,
      field: 'DischargingPlaceTitle',
    },
    {
      header: this.appTitle.tables.loads.loadTotalAmount,
      field: 'Total',
      class: 'text-right',
    },
    {
      header: this.appTitle.tables.loads.loadRemainedAmount,
      field: 'Reminder',
      class: 'text-right',
    },
    { header: this.appTitle.tables.loads.loadCost, field: 'Tariff' },
    { header: this.appTitle.tables.loads.loadStatus, field: 'LoadStatusName' },
    {
      header: this.appTitle.tables.loads.loadAnnouncementDate,
      field: 'AnnounceDate',
    },
    {
      header: this.appTitle.tables.loads.loadAnnouncementTime,
      field: 'AnnounceTime',
    },
    {
      header: this.appTitle.tables.loads.announcementGroup,
      field: 'AnnouncementTitle',
    },
    {
      header: this.appTitle.tables.loads.announcementSubGroup,
      field: 'AnnouncementSGTitle',
    },
    { header: this.appTitle.tables.loads.recipient, field: 'Recipient' },
    { header: this.appTitle.tables.loads.address, field: 'Address' },
    { header: this.appTitle.tables.loads.description, field: 'Description' },
    { header: 'نام کاربر', field: 'UserName' },
    {
      header: this.appTitle.tables.loads.tptParamsJoint,
      field: 'TPTParamsJoint',
    },
  ];

  readonly autoCompletions: AutoCompleteFilter[] = [
    this.autoCompleteFactory.create(
      AutoCompleteType.AnnouncementGroup,
      this.getLoadFilterControl('announceGroupId')
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
      this.getLoadFilterControl('announceSubgroupId'),
      {
        control: this.getLoadFilterControl('announceSubgroupTitle'),
        readOnly: () => this.getLoadFilterControl('announceGroupId').invalid,
        groupControlId: this.getLoadFilterControl('announceGroupId'),
      }
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.LoadStatus,
      this.getLoadFilterControl('loadsStatusId')
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.TransportCompany,
      this.getLoadFilterControl('transportCompanyId'),
      {
        readOnly: () => this.loadType === LoadListType.TRANSPORT_COMPANY,
        control: this.getLoadFilterControl('transportCompanyTitle'),
      }
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.City,
      this.getLoadFilterControl('sourceCityId'),
      { label: 'شهر مبدا', placeholder: 'شهر مبدا' }
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.City,
      this.getLoadFilterControl('targetCityId'),
      { label: 'شهر مقصد', placeholder: 'شهر مقصد' }
    ),
  ];

  constructor() {
    super();
    effect(() => {
      if (this.sharedSignal() === null) {
        this.table?.clearSelections();
      }
    });
  }
  async onViewActivated(): Promise<void> {
    await this.initializeLoads();
    this.getLoadFilterControl('date').setValue(null);
  }

  async filterListLoad(): Promise<void> {
    if (this.loading() || this.isFilterInvalid()) return;

    await this.withLoading(async () => {
      const response = await this.getListLoadInfo();

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
    this.sharedSignal.set(row as LoadInfo);
  }

  rowUnSelect(_: LoadTransportCompaniesTable): void {
    this.sharedSignal.set(null);
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

  getLoadFilterControl<K extends keyof LoadFilter>(
    name: K
  ): FormControl<LoadFilter[K]> {
    const control = this.loadFilterForm.get(name as string);
    if (!control) throw new Error(`Control "${String(name)}" not found`);
    return control as FormControl<LoadFilter[K]>;
  }

  private async initializeLoads(): Promise<void> {
    if (this.loadType === LoadListType.TRANSPORT_COMPANY) {
      await this.loadTransportCompany();
      await this.filterListLoad();
    }
  }

  private async loadTransportCompany(): Promise<void> {
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
  }

  private extractFilterFormData() {
    const form = this.loadFilterForm.controls;
    return {
      transportCompanyId: form.transportCompanyId.value || undefined,
      announceGroupId: form.announceGroupId.value || undefined,
      announceSubgroupId: form.announceSubgroupId.value || undefined,
      date: form.date.value || undefined,
      loadsStatusId: form.loadsStatusId.value || undefined,
      sourceCityId: form.sourceCityId.value || undefined,
      targetCityId: form.targetCityId.value || undefined,
      inventory: form.inventory.value,
    };
  }

  private getListLoadInfo() {
    const f = this.extractFilterFormData();
    const commonArgs: [
      number | undefined,
      number | undefined,
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ] = [
      f.announceGroupId,
      f.announceSubgroupId,
      f.inventory,
      f.date,
      f.loadsStatusId,
      f.sourceCityId,
      f.targetCityId,
    ];

    switch (this.loadType) {
      case LoadListType.TRANSPORT_COMPANY:
        return this.loadsService.GetLoadsForTransportCompanies(...commonArgs);
      case LoadListType.ADMIN:
        return this.loadsService.GetLoadsForAdmin(
          f.transportCompanyId,
          ...commonArgs
        );
      case LoadListType.FACTORIES_PRODUCTION_CENTERS:
        return this.loadsService.GetLoadsForFactoriesAndProductionCenters(
          f.transportCompanyId,
          ...commonArgs
        );
      default:
        throw new Error(`Unknown load type: ${this.loadType}`);
    }
  }
}

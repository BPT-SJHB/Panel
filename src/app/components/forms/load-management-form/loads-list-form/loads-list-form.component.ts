import {
  AfterViewInit,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { CheckboxInputComponent } from 'app/components/shared/inputs/checkbox-input/checkbox-input.component';

import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';

import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';

import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { takeUntil } from 'rxjs';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteFilter,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';

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
  implements AfterViewInit
{
  readonly loadType = LoadListType.TRANSPORT_COMPANY;
  readonly addonWidth = '10rem';

  shearedSignal!: WritableSignal<null | LoadInfo>;
  rows = signal<LoadTransportCompaniesTable[]>([]);

  readonly fb = inject(FormBuilder);
  private readonly loadsService = inject(LoadManagementService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
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
        readOnly: () => this.isTransportCompanyInputReadOnly(),
        control: this.getLoadFilterControl('transportCompanyTitle'),
      }
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.City,
      this.getLoadFilterControl('sourceCityId'),
      {
        label: 'شهر مبدا',
        placeholder: 'شهر مبدا',
      }
    ),
    this.autoCompleteFactory.create(
      AutoCompleteType.City,
      this.getLoadFilterControl('targetCityId'),
      {
        label: 'شهر مقصد',
        placeholder: 'شهر مقصد',
      }
    ),
  ];

  async filterListLoad(): Promise<void> {
    if (this.loading() || this.isFilterInvalid()) return;

    const filter = this.extractFilterFormData();
    await this.withLoading(async () => {
      const response = await this.loadsService.GetLoadsForTransportCompanies(
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

  rowUnSelect(_: LoadTransportCompaniesTable): void {
    this.shearedSignal.set(null);
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

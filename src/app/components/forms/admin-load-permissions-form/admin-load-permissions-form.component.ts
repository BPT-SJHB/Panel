import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Shared UI components
import { ButtonComponent } from 'app/components/shared/button/button.component';
import {
  TableComponent,
  TableColumn,
} from 'app/components/shared/table/table.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { CheckboxInputComponent } from 'app/components/shared/inputs/checkbox-input/checkbox-input.component';

// Base & services
import { BaseLoading } from '../shared/component-base/base-loading';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { LoadPermission } from 'app/services/report-management/model/load-permissions/load-permission.model';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { LoadManagementService } from 'app/services/load-management/load-management.service';

// Constants & utils
import { TableConfig } from 'app/constants/ui/table.ui';
import { checkAndToastError } from 'app/utils/api-utils';

// --- Interfaces ---
interface LoadPermissionCancelForm {
  LAId: number;
  Description: string;
  LoadResuscitation: boolean;
  TurnResuscitation: boolean;
  Driver: string;
  Turn: number;
}

@Component({
  selector: 'app-admin-load-permissions-form',
  standalone: true,
  imports: [
    ButtonComponent,
    TableComponent,
    TextInputComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './admin-load-permissions-form.component.html',
  styleUrls: ['./admin-load-permissions-form.component.scss'],
})
export class AdminLoadPermissionsFormComponent extends BaseLoading {
  // --- Injections ---
  private readonly fb = inject(FormBuilder);
  private readonly reportService = inject(ReportsManagementService);
  private readonly loadService = inject(LoadManagementService);

  // --- Signals & State ---
  readonly sharedSignal = signal<LoadInfo | null>(null);
  readonly selectedLoadInfo = computed(() => this.sharedSignal());
  readonly loadPermissionsRows = signal<LoadPermission[]>([]);

  readonly tableConfig = { ...TableConfig, paginator: false };
  readonly addonWidth = '10rem';

  // --- Form ---
  readonly form = this.fb.group({
    LAId: this.fb.control<number | null>(null, Validators.required),
    Description: this.fb.nonNullable.control(''),
    TurnResuscitation: this.fb.nonNullable.control(false),
    LoadResuscitation: this.fb.nonNullable.control(false),
    Driver: this.fb.nonNullable.control(''),
    Turn: this.fb.control<number | null>(null),
  });

  // --- Table Columns ---
  readonly columns: TableColumn<LoadPermission>[] = [
    { header: 'شناسه بار', field: 'LoadId' },
    { header: 'عنوان کالا', field: 'GoodTitle' },
    { header: 'شهر مبدا', field: 'LoadSourceCity' },
    { header: 'شهر مقصد', field: 'LoadTargetCity' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'شرکت حمل ونقل', field: 'TransportCompany' },
    { header: 'گیرنده', field: 'Recipient' },
    { header: 'آدرس', field: 'Address' },
    { header: 'توضیحات', field: 'Description' },
    { header: 'کاربر تخصیص بار', field: 'LoadAllocationUser' },
    { header: 'شناسه تخصیص بار', field: 'LoadAllocationId' },
    { header: 'پلاک خودرو', field: 'LicensePlate' },
    { header: 'شماره کارت هوشمند', field: 'SmartCardNo' },
    { header: 'راننده', field: 'TruckDriver' },
    { header: 'کد ملی راننده', field: 'NationalCode' },
    { header: 'شماره موبایل', field: 'MobileNumber' },
    { header: 'تاریخ تخصیص بار', field: 'ShamsiDate' },
    { header: 'زمان تخصیص بار', field: 'Time' },
    { header: 'تسلسل نوبت', field: 'SequentialTurn' },
    { header: 'یادداشت', field: 'Note' },
    { header: 'وضعیت تخصیص بار', field: 'LoadAllocationStatusTitle' },
    { header: 'پارامترهای موثر', field: 'TPTParamsJoint' },
  ];

  // --- Lifecycle ---
  onViewActivated(): void {
    this.form.reset();
    this.loadPermissions();
  }

  // --- Methods ---
  private async loadPermissions(): Promise<void> {
    const loadInfo = this.selectedLoadInfo();
    if (!loadInfo || this.loading()) return;

    await this.withLoading(async () => {
      const res = await this.reportService.GetLoadPermissions(loadInfo.LoadId);
      if (!checkAndToastError(res, this.toast)) {
        this.loadPermissionsRows.set([]);
        return;
      }

      this.loadPermissionsRows.set(res.data);
      this.form.patchValue({ LAId: res.data[0].LoadAllocationId });
    });
  }

  async cancelPermission(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    const { LAId, Description, TurnResuscitation, LoadResuscitation } =
      this.form.getRawValue();

    await this.withLoading(async () => {
      const res = await this.loadService.CancelLoadPermission(
        LAId!,
        Description,
        TurnResuscitation,
        LoadResuscitation
      );

      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  async allocateDriver(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    const { LAId } = this.form.getRawValue();

    await this.withLoading(async () => {
      const res = await this.loadService.AllocateLoadToNextTurn(LAId!);

      if (!checkAndToastError(res, this.toast)) return;
      this.form.patchValue({
        Driver: res.data.TruckDriverName,
        Turn: res.data.TurnId,
      });
    });
  }

  ctrl<K extends keyof LoadPermissionCancelForm>(
    name: K
  ): FormControl<LoadPermissionCancelForm[K]> {
    const control = this.form.get(name as string);
    if (!control) throw new Error(`Control "${String(name)}" not found`);
    return control as FormControl<LoadPermissionCancelForm[K]>;
  }
}

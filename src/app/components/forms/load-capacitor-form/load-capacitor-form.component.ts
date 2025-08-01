import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadInfo } from 'app/data/model/load-info.model';
import { PTPInfo } from 'app/data/model/ptp-info-model';
import { LoadCapacitorManagementService } from 'app/services/load-capacitor-management/load-capacitor-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from "app/components/shared/button/button.component";
import { DatePickerInput } from "app/components/shared/inputs/date-picker-input/date-picker-input.component.component";

@Component({
  selector: 'app-load-capacitor-form',
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent, ButtonModule, TableModule, Checkbox, ButtonComponent, DatePickerInput],
  templateUrl: './load-capacitor-form.component.html',
  styleUrl: './load-capacitor-form.component.scss',
})
export class LoadCapacitorFormComponent {
  private fb = inject(FormBuilder);
  private capacitorService = inject(LoadCapacitorManagementService);
  private toast = inject(ToastService);

  addonWidth = '9rem';
  searchForm = this.fb.group({
    barcode: ['', ValidationSchema.id], // کدبار
  });

  ptpFormArray: FormArray = this.fb.array<PTPInfo>([]);

  capacitorForm = this.fb.group({
    announceDate: ['',ValidationSchema.announceDate], // زمان ثبت بار

    // وضعیت نهایی بار
    loadStatusId: [0,ValidationSchema.id],
    loadStatusTitle: [''],

    // نوع بار
    goodId: [0,ValidationSchema.id],
    goodTitle: ['',ValidationSchema.good],

    // گروه اعلام بار
    loadAnnouncementGroupId: [0,ValidationSchema.id],
    loadAnnouncementGroupTitle: ['',ValidationSchema.loadAnnouncementGroup],

    // زیر گروه اعلام بار
    loadAnnouncementSubGroupId: [0],
    loadAnnouncementSubGroupTitle: ['',ValidationSchema.loadAnnouncementSubGroup],

    // شهر مبدا
    sourceCityId: [0,ValidationSchema.id],
    sourceCityTitle: ['',ValidationSchema.sourceCity],

    // شهر مقصد
    targetCityId: [0,ValidationSchema.id],
    targetCityTitle: ['',ValidationSchema.targetCity],

    // مبدا بارگیری,
    loadingPlaceId: [0,ValidationSchema.id],
    loadingPlaceTitle: ['',ValidationSchema.loadingPlace],

    // مقصد تخلیه
    dischargingPlaceId: [0,ValidationSchema.id],
    dischargingPlaceTitle: ['',ValidationSchema.dischargingPlace],

    // شرکت اعلام کننده بار
    transportCompanyId: [0,ValidationSchema.id],
    transportCompanyTitle: ['',ValidationSchema.transportCompany],

    // تعداد، تناژ، گیرنده، تعرفه
    totalNumber: [0,ValidationSchema.totalNumber],
    tonaj: [0,ValidationSchema.tonaj],
    recipient: ['',ValidationSchema.recipient],
    tarrif: [0,ValidationSchema.tariff],

    // آدرس و توضیحات
    address: ['',ValidationSchema.address],
    description: ['',ValidationSchema.description],
  });
  loading: any;

  async loadCapacitorForm(): Promise<void> {
    if (this.searchForm.invalid) return;
    const response = await this.capacitorService.GetLoad(this.barcode.value);
    if (!this.isSuccessful(response)) return;
    this.populateCapacitorForm(response.data!);

    this.ptpFormArray.clear();
    response.data?.TPTParams.map((params) => {
      this.ptpFormArray.push(this.createPTPGroup(params));
    });
  }


  editOrRegister() {
    this.toast.info("اطلاعیه",'در دست توسعه');
  }

  private populateCapacitorForm(load: LoadInfo): void {
    this.capacitorForm.setValue({
      announceDate: load.AnnounceDate,

      loadStatusId: load.LoadStatusId,
      loadStatusTitle: load.LoadStatusTitle,

      goodId: load.GoodId,
      goodTitle: load.GoodTitle,

      loadAnnouncementGroupId: load.LoadAnnouncementGroupId,
      loadAnnouncementGroupTitle: load.LoadAnnouncementGroupTitle,

      loadAnnouncementSubGroupId: load.LoadAnnouncementSubGroupId,
      loadAnnouncementSubGroupTitle: load.LoadAnnouncementSubGroupTitle,

      sourceCityId: load.SourceCityId,
      sourceCityTitle: load.SourceCityTitle,

      targetCityId: load.TargetCityId,
      targetCityTitle: load.TargetCityTitle,

      loadingPlaceId: load.LoadingPlaceId,
      loadingPlaceTitle: load.LoadingPlaceTitle,

      dischargingPlaceId: load.DischargingPlaceId,
      dischargingPlaceTitle: load.DischargingPlaceTitle,

      transportCompanyId: load.TransportCompanyId,
      transportCompanyTitle: load.TransportCompanyTitle,

      totalNumber: load.TotalNumber,
      tonaj: load.Tonaj,
      recipient: load.Recipient,
      tarrif: load.Tarrif,

      address: load.Address,
      description: load.Description,
    });
  }

  private createPTPGroup(item: PTPInfo): FormGroup {
    return this.fb.group({
      TPTPDId: [item.TPTPDId],
      TPTPTitle: [item.TPTPTitle],
      Cost: [item.Cost, [Validators.required]],
      Checked: [item.Checked],
    });
  }


  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      return false;
    }
    return true;
  }

  get barcode(): FormControl {
    return this.searchForm.get('barcode') as FormControl;
  }

  get announceDate(): FormControl {
    return this.capacitorForm.get('announceDate') as FormControl;
  }

  get loadStatusId(): FormControl {
    return this.capacitorForm.get('loadStatusId') as FormControl;
  }
  get loadStatusTitle(): FormControl {
    return this.capacitorForm.get('loadStatusTitle') as FormControl;
  }

  get goodId(): FormControl {
    return this.capacitorForm.get('goodId') as FormControl;
  }
  get goodTitle(): FormControl {
    return this.capacitorForm.get('goodTitle') as FormControl;
  }

  get loadAnnouncementGroupId(): FormControl {
    return this.capacitorForm.get('loadAnnouncementGroupId') as FormControl;
  }
  get loadAnnouncementGroupTitle(): FormControl {
    return this.capacitorForm.get('loadAnnouncementGroupTitle') as FormControl;
  }

  get loadAnnouncementSubGroupId(): FormControl {
    return this.capacitorForm.get('loadAnnouncementSubGroupId') as FormControl;
  }

  get loadAnnouncementSubGroupTitle(): FormControl {
    return this.capacitorForm.get(
      'loadAnnouncementSubGroupTitle'
    ) as FormControl;
  }

  get sourceCityId(): FormControl {
    return this.capacitorForm.get('sourceCityId') as FormControl;
  }
  get sourceCityTitle(): FormControl {
    return this.capacitorForm.get('sourceCityTitle') as FormControl;
  }

  get targetCityId(): FormControl {
    return this.capacitorForm.get('targetCityId') as FormControl;
  }
  get targetCityTitle(): FormControl {
    return this.capacitorForm.get('targetCityTitle') as FormControl;
  }

  get loadingPlaceId(): FormControl {
    return this.capacitorForm.get('loadingPlaceId') as FormControl;
  }
  get loadingPlaceTitle(): FormControl {
    return this.capacitorForm.get('loadingPlaceTitle') as FormControl;
  }

  get dischargingPlaceId(): FormControl {
    return this.capacitorForm.get('dischargingPlaceId') as FormControl;
  }
  get dischargingPlaceTitle(): FormControl {
    return this.capacitorForm.get('dischargingPlaceTitle') as FormControl;
  }

  get transportCompanyId(): FormControl {
    return this.capacitorForm.get('transportCompanyId') as FormControl;
  }
  get transportCompanyTitle(): FormControl {
    return this.capacitorForm.get('transportCompanyTitle') as FormControl;
  }

  get totalNumber(): FormControl {
    return this.capacitorForm.get('totalNumber') as FormControl;
  }
  get tonaj(): FormControl {
    return this.capacitorForm.get('tonaj') as FormControl;
  }
  get recipient(): FormControl {
    return this.capacitorForm.get('recipient') as FormControl;
  }
  get tarrif(): FormControl {
    return this.capacitorForm.get('tarrif') as FormControl;
  }

  get address(): FormControl {
    return this.capacitorForm.get('address') as FormControl;
  }
  get description(): FormControl {
    return this.capacitorForm.get('description') as FormControl;
  }
}

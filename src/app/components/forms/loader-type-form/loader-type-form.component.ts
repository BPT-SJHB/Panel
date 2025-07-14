import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loader-type-form',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    TextInputComponent,
    CheckboxModule,
    TableModule,
  ],
  templateUrl: './loader-type-form.component.html',
  styleUrls: ['./loader-type-form.component.scss'],
})
export class LoaderTypeFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private loaderTypeService = inject(LoaderTypesService);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();

  loading = false;
  loadersFormArray: FormArray = this.fb.array([]);
  searchForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  async searchLoaders(query: string): Promise<void> {
    const response = await this.loaderTypeService.GetLoaderTypesInfo(query);
    if (!this.isSuccessful(response)) {
      this.loadersFormArray.clear();
    }
    this.loadersFormArray.clear();
    response.data!.forEach((loader: any) =>
      this.loadersFormArray.push(this.createLoaderGroup(loader))
    );
  }

  async loadLoadersType() {
    if (this.searchForm.invalid || this.loading) return;
    try {
      this.loadingService.setLoading(true);
      await this.searchLoaders(this.searchTitle.value);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async onChangeCheckBox(control: FormGroup) {
    const id = control.get('id')?.value ?? -1;
    const status = control.get('status')?.value ?? false;

    const response = await this.loaderTypeService.ChangeLoaderTypeStatus(id);
    if (!this.isSuccessful(response) && control.get('status')) {
      control.get('status')?.setValue(!status);
      return;
    }

    this.toast.success('موفق', response.data?.Message ?? '');
  }

  private createLoaderGroup(item: LoaderType): FormGroup {
    return this.fb.group({
      id: [item.LoaderTypeId],
      code: [item.LoaderTypeOrganizationId],
      title: [item.LoaderTypeTitle],
      type: [item.LoaderTypeTitle],
      status: [item.Active],
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

  getCheckedControl(index: number): FormControl<any> {
    return this.loadersFormArray.at(index).get('status') as FormControl;
  }

  get searchTitle(): FormControl {
    return this.searchForm.get('title') as FormControl;
  }
}

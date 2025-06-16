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
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {TableModule} from "primeng/table"

@Component({
  selector: 'app-loader-type-form',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    TextInputComponent,
    CheckboxModule,
    TableModule
  ],
  templateUrl: './loader-type-form.component.html',
  styleUrls: ['./loader-type-form.component.scss'],
})
export class LoaderTypeFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  readonly cacheKeyLength = 3;
  readonly cachingEnabled = true;

  startKey = '';
  cachedLoadersList: any[] = [];
  loadersFormArray: FormArray = this.fb.array([]);
  loading = false;

  searchForm = this.fb.group({
    title: ['', Validators.required],
  });

  async searchLoaders(query: string): Promise<void> {
    if (query.length < this.cacheKeyLength) {
      this.loadersFormArray.clear();
      return;
    }
 
    const newStartKey = query.substring(0, this.cacheKeyLength);
    if (this.cachingEnabled && newStartKey === this.startKey) {
      const filteredLoaders = this.cachedLoadersList.filter((item) =>
        item.title?.toLowerCase().includes(query.toLowerCase())
      );
      this.loadersFormArray.clear();
      filteredLoaders.forEach((loader) =>
        this.loadersFormArray.push(this.createLoaderGroup(loader))
      );
      return;
    }

    const response = await this.getData();
    if (!this.isSuccessful(response)) return;
       

    this.startKey = newStartKey;
    this.cachedLoadersList = response.data!;

    this.loadersFormArray.clear();
    response.data.forEach((loader:any) =>
      this.loadersFormArray.push(this.createLoaderGroup(loader))
    );
  }

  async loadLoadersType() {
    if (this.searchForm.invalid || this.loading) return;
    try {
      this.loading = true;
      await this.searchLoaders(this.searchTitle.value);
    } finally { 
        this.loading = false;
    }
  }

  private createLoaderGroup(item: any): FormGroup {
    return this.fb.group({
      id: [item.id],
      code: [item.code],
      title: [item.title],
      type: [item.type],
      status: [item.status],
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

  private async getData(): Promise<ApiResponse<any>> {
    return {
      success: true,
      data: [
        {
          id: 505,
          code: 505,
          title: 'کفی 18 چرخ',
          type: 'غیرثابت',
          status: true,
        },
        {
          id: 504,
          code: 504,
          title: 'کفی 16 چرخ',
          type: 'غیرثابت',
          status: false,
        },
      ],
    };
  }
  get searchTitle(): FormControl {
    return this.searchForm.get('title') as FormControl;
  }
}

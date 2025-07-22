import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

import { UserManagementService } from 'app/services/user-management/user-management.service';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { SoftwareUserInfo } from 'app/services/user-management/model/software-user-info.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';

interface SelectedNodes {
  [key: string]: { checked: boolean; partialChecked?: boolean };
}

@Component({
  selector: 'app-users-menu-access-form',
  imports: [
    TreeTableModule,
    SearchInputComponent,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    TextInputComponent
],
  templateUrl: './users-menu-access-form.component.html',
  styleUrl: './users-menu-access-form.component.scss',
})
export class UsersMenuAccessFormComponent implements OnInit, OnDestroy {
  private userManager = inject(UserManagementService);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();

  isLoading: boolean = false;
  accessTable?: TreeNode[] = [];
  selectedNodes: SelectedNodes = {};
  selectedNodesCopy: SelectedNodes = {};
  userInfo: SoftwareUserInfo = { UserId: 0 };

  searchForm: FormGroup = this.fb.group({
    searchPhone: ['', ValidationSchema.mobile],
  });
  cols = [
    { field: 'PGTitle', header: 'نام منو' },
    { field: 'Description', header: 'توضیحات' },
  ];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.isLoading = value));
  }

  async SaveChanges() {
    if (this.isLoading) return;

    this.loadingService.setLoading(true);

    try {
      // === Step 1: Disable old access (selectedNodesCopy, PAccess: false) ===
      const disablePromises: Promise<ApiResponse<ShortResponse>>[] = [];

      for (const key in this.selectedNodesCopy) {
        if (
          this.selectedNodesCopy[key].checked ||
          this.selectedNodesCopy[key].partialChecked
        ) {
          if (key.includes('-')) {
            disablePromises.push(
              this.userManager.ChangeUserWebProcessAccess(
                this.userInfo.UserId,
                Number(key.split('-')[1]),
                false
              )
            );
          } else {
            disablePromises.push(
              this.userManager.ChangeUserWebProcessGroupAccess(
                this.userInfo.UserId,
                Number(key),
                false
              )
            );
          }
        }
      }

      const disableResults = await Promise.allSettled(disablePromises);
      const firstDisableError = disableResults.find(
        (r) => r.status === 'rejected'
      ) as PromiseRejectedResult | undefined;

      if (firstDisableError) {
        const error =
          (firstDisableError.reason as any)?.error?.message ??
          'خطای غیرمنتظره‌ای در حذف دسترسی رخ داد';
        this.toast.error('خطا', error);
        return;
      }

      // === Step 2: Enable new access (selectedNodes, PAccess: true) ===
      const enablePromises: Promise<ApiResponse<ShortResponse>>[] = [];

      for (const key in this.selectedNodes) {
        if (
          this.selectedNodes[key].checked ||
          this.selectedNodes[key].partialChecked
        ) {
          if (key.includes('-')) {
            enablePromises.push(
              this.userManager.ChangeUserWebProcessAccess(
                this.userInfo.UserId,
                Number(key.split('-')[1]),
                true
              )
            );
          } else {
            enablePromises.push(
              this.userManager.ChangeUserWebProcessGroupAccess(
                this.userInfo.UserId,
                Number(key),
                true
              )
            );
          }
        }
      }

      const enableResults = await Promise.allSettled(enablePromises);
      const firstEnableError = enableResults.find(
        (r) => r.status === 'rejected'
      ) as PromiseRejectedResult | undefined;
      const firstEnableSuccess = enableResults.find(
        (r) => r.status === 'fulfilled'
      ) as PromiseFulfilledResult<ApiResponse<ShortResponse>> | undefined;

      if (firstEnableError) {
        const error =
          (firstEnableError.reason as any)?.error?.message ??
          'خطای غیرمنتظره‌ای در اعمال دسترسی رخ داد';
        this.toast.error('خطا', error);
      } else {
        const message =
          firstEnableSuccess?.value?.data?.Message ??
          'دسترسی با موفقیت اعمال شد';
        this.toast.success('موفق', message);
      }

      // === Reload the table ===
      await this.LoadWebProcessGroups_WebProcessesTable();
    } catch (err) {
      this.toast.error('خطا', 'خطای بحرانی در ذخیره‌سازی رخ داد');
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async LoadWebProcessGroups_WebProcessesTable(): Promise<void> {
    const response = await this.userManager.GetWebProcessGroups_WebProcesses(
      this.userInfo.MobileNumber!
    );
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطا در هنگام براگزاری اطلاعات'
      );
      this.accessTable = [];
      return;
    }

    const loadedTable = response.data;
    this.accessTable =
      loadedTable.map((x) => ({
        key: x.PGId.toString(),
        data: {
          PGTitle: x.PGTitle,
          Description: '',
        },
        checked: x.PGAccess === true,
        children: x.WebProcesses?.map((y) => ({
          key: x.PGId.toString() + '-' + y.PId.toString(),
          data: {
            PGTitle: y.PTitle,
            Description: y.Description,
          },
          checked: y.PAccess === true,
          children: [],
        })),
      })) ?? [];

    this.accessTable.forEach((parentNode) => {
      this.selectedNodes[parentNode.key!] = {
        checked: parentNode.checked!,
        partialChecked: parentNode.partialSelected,
      };
      parentNode.children?.forEach((childNode) => {
        this.selectedNodes[childNode.key!] = {
          checked: childNode.checked!,
          partialChecked: childNode.partialSelected,
        };
      });
    });

    this.selectedNodesCopy = structuredClone(this.selectedNodes);
  }

  async getUserAccessMenu() {
    if (this.searchForm.invalid || this.isLoading) return;

    this.loadingService.setLoading(true);
    try {
      const response = await this.userManager.GetSoftwareUserInfo(
        this.searchPhone.value
      );
      if (!response.success || !response.data) {
        this.toast.error(
          'خطا',
          response.error?.message ?? 'خطا در هنگام براگزاری اطلاعات'
        );
        this.accessTable = [];
        return;
      }

      this.userInfo = {
        UserId: response.data?.UserId,
        MobileNumber: response.data?.MobileNumber,
      };
    } finally {
      this.loadingService.setLoading(false);
    }

    this.loadingService.setLoading(true);
    await this.LoadWebProcessGroups_WebProcessesTable();
    this.loadingService.setLoading(false);
  }

  get searchPhone() {
    return this.searchForm.get('searchPhone') as FormControl;
  }
}

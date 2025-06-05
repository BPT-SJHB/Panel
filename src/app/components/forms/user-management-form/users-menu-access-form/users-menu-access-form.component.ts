import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneInputComponent } from 'app/components/shared/inputs/phone-input/phone-input.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';

interface SelectedNodes {
  [key: string]: { checked: boolean; partialChecked?: boolean };
}

@Component({
  selector: 'app-users-menu-access-form',
  imports: [
    TreeTableModule,
    CommonModule,
    SearchInputComponent,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    PhoneInputComponent
  ],
  templateUrl: './users-menu-access-form.component.html',
  styleUrl: './users-menu-access-form.component.scss',
})
export class UsersMenuAccessFormComponent {

  searchForm: FormGroup;

  isLoading: boolean = false;
  accessTable?: TreeNode[] = [];

  cols = [
    { field: 'PGTitle', header: 'نام منو' },
    { field: 'Description', header: 'توضیحات' },
  ];

  selectedNodes: SelectedNodes = {};
  selectedNodesCopy: SelectedNodes = {};

  userInfo: SoftwareUserInfo = { UserId: 0 };

  constructor(
    private userAuth: UserAuthService,
    private userManager: UserManagementService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchPhone: ['',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}')
        ]
      ]
    })
  }

  async SaveChanges() {
    if (this.isLoading) return;

    this.isLoading = true;

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
                { UserId: this.userInfo.UserId },
                { PId: Number(key.split('-')[1]), PAccess: false }
              )
            );
          } else {
            disablePromises.push(
              this.userManager.ChangeUserWebProcessGroupAccess(
                { UserId: this.userInfo.UserId },
                { PGId: Number(key), PGAccess: false }
              )
            );
          }
        }
      }

      const disableResults = await Promise.allSettled(disablePromises);
      const firstDisableError = disableResults.find(r => r.status === 'rejected') as PromiseRejectedResult | undefined;

      if (firstDisableError) {
        const error = (firstDisableError.reason as any)?.error?.message ?? 'خطای غیرمنتظره‌ای در حذف دسترسی رخ داد';
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
                { UserId: this.userInfo.UserId },
                { PId: Number(key.split('-')[1]), PAccess: true }
              )
            );
          } else {
            enablePromises.push(
              this.userManager.ChangeUserWebProcessGroupAccess(
                { UserId: this.userInfo.UserId },
                { PGId: Number(key), PGAccess: true }
              )
            );
          }
        }
      }

      const enableResults = await Promise.allSettled(enablePromises);
      const firstEnableError = enableResults.find(r => r.status === 'rejected') as PromiseRejectedResult | undefined;
      const firstEnableSuccess = enableResults.find(r => r.status === 'fulfilled') as PromiseFulfilledResult<ApiResponse<ShortResponse>> | undefined;

      if (firstEnableError) {
        const error = (firstEnableError.reason as any)?.error?.message ?? 'خطای غیرمنتظره‌ای در اعمال دسترسی رخ داد';
        this.toast.error('خطا', error);
      } else {
        const message = firstEnableSuccess?.value?.data?.Message ?? 'دسترسی با موفقیت اعمال شد';
        this.toast.success('موفق', message);
      }

      // === Reload the table ===
      await this.LoadWebProcessGroups_WebProcessesTable();

    } catch (err) {
      this.toast.error('خطا', 'خطای بحرانی در ذخیره‌سازی رخ داد');
    } finally {
      this.isLoading = false;
    }
  }

  private async LoadWebProcessGroups_WebProcessesTable(): Promise<void> {
    const response = await this.userManager.GetWebProcessGroups_WebProcesses(
      this.userInfo.MobileNumber!
    );
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطا در هنگام براگزاری اطلاعات');
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
    if (this.searchForm.invalid || this.isLoading)
      return;

    this.isLoading = true;
    try {
      const response = await this.userManager.GetSoftwareUserInfo(this.searchPhone.value);
      if (!response.success || !response.data) {
        this.toast.error('خطا', response.error?.message ?? 'خطا در هنگام براگزاری اطلاعات');
        this.accessTable = [];
        return;
      }

      this.userInfo = {UserId:response.data?.UserId, MobileNumber:response.data?.MobileNumber}
    } finally {
      this.isLoading =false;
    }

    this.isLoading = true;
    await this.LoadWebProcessGroups_WebProcessesTable();
    this.isLoading = false;
  }

  get searchPhone() {
    return this.searchForm.get('searchPhone') as FormControl;
  }
}

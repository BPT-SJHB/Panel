import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UserManagementService } from 'app/services/user-management/user-management.service';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import {
  TreeTableCheckboxComponent,
  TreeTableChangedData,
} from 'app/components/trees/tree-table-checkbox/tree-table-checkbox.component';

import { BaseLoading } from '../../shared/component-base/base-loading';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { SoftwareUserInfo } from 'app/services/user-management/model/software-user-info.model';
import { ValidationSchema } from 'app/constants/validation-schema';
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';

interface PageGroup {
  PGId: number;
  PGTitle: string;
  PGAccess: boolean;
}

interface Process {
  PId: number;
  PTitle: string;
  PAccess: boolean;
}

@Component({
  selector: 'app-users-menu-access-form',
  standalone: true,
  templateUrl: './users-menu-access-form.component.html',
  styleUrl: './users-menu-access-form.component.scss',
  imports: [
    TreeTableModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    SearchInputComponent,
    TreeTableCheckboxComponent,
    ButtonComponent,
  ],
})
export class UsersMenuAccessFormComponent extends BaseLoading {
  readonly sharedSignal = signal<string | null>(null);

  private readonly userService = inject(UserManagementService);

  readonly mobileControl = new FormControl('', ValidationSchema.mobile);
  readonly tree = signal<TreeNode[]>([]);
  readonly userInfo = signal<SoftwareUserInfo | null>(null);

  readonly rows = [['PGTitle', 'PTitle'], ['Description']];
  readonly searchFields = ['PGTitle', 'PTitle'];
  readonly cols = ['منو', 'توضیحات'];
  readonly appTitles = AppTitles;

  private parentChanges = new Map<number, PageGroup>();
  private childChanges = new Map<number, Process>();

  readonly mobileNumber = computed(() => {
    return this.sharedSignal();
  });

  constructor() {
    super();

    effect(() => {
      const mobile = this.sharedSignal();

      if (!mobile) return;
      this.mobileControl.patchValue(mobile);
      this.mobileControl.markAsPristine();

      this.tree.set([]);
    });
  }

  /**
   * Search user by mobile number and load their menu access tree
   */
  searchUser = async (query: string): Promise<void> => {
    if (this.mobileControl.invalid || this.loading()) return;
    this.parentChanges.clear();
    this.childChanges.clear();

    await this.withLoading(async () => {
      const userLoaded = await this.loadUser(query);
      if (!userLoaded) {
        this.tree.set([]);
        return;
      }

      const treeNodes = await this.getGroupProcesses(
        this.userInfo()?.MobileNumber ?? ''
      );
      this.tree.set(treeNodes);
    });
  };

  /**
   * Load user info by mobile number
   */
  private async loadUser(mobile: string): Promise<boolean> {
    const response = await this.userService.GetSoftwareUserInfo(mobile);
    if (!checkAndToastError(response, this.toast)) {
      this.userInfo.set(null);
      return false;
    }
    this.userInfo.set(response.data);
    return true;
  }

  /**
   * Fetch process groups and convert to TreeNodes
   */
  private async getGroupProcesses(mobile: string): Promise<TreeNode[]> {
    const response =
      await this.userService.GetWebProcessGroups_WebProcesses(mobile);
    if (!checkAndToastError(response, this.toast)) return [];
    return this.convertToTreeNode(response.data);
  }

  /**
   * Convert API group processes to TreeNode structure
   */
  private convertToTreeNode(groups: ApiGroupProcess[]): TreeNode[] {
    return groups.map((group) => ({
      data: {
        PGId: group.PGId,
        PGTitle: group.PGTitle,
        PGAccess: group.PGAccess,
      },
      children:
        group.WebProcesses?.map((process) => ({
          data: process,
          children: [],
        })) ?? [],
      expanded: false,
    }));
  }

  /**
   * Handle TreeTable checkbox changes and track modifications
   */
  onTableCheckBoxChange({ parent, children }: TreeTableChangedData): void {
    if (parent) {
      const { PGId } = parent;

      if (this.parentChanges.has(PGId)) {
        this.parentChanges.delete(PGId);
      } else {
        this.parentChanges.set(PGId, parent);
      }
    }

    children?.forEach((child) => {
      const { PId } = child;

      if (this.childChanges.has(PId)) {
        this.childChanges.delete(PId);
      } else {
        this.childChanges.set(PId, child);
      }
    });
  }

  /**
   * Apply all access changes for selected user
   */

  async updateAccesses(): Promise<void> {
    if (this.loading() || !this.userInfo()) return;

    await this.withLoading(async () => {
      const userId = this.userInfo()!.UserId;

      // collect all change functions
      const changeRequests = [
        ...Array.from(this.parentChanges.values()).map((parent) =>
          this.userService.ChangeUserWebProcessGroupAccess(
            userId,
            parent.PGId,
            parent.PGAccess
          )
        ),
        ...Array.from(this.childChanges.values()).map((child) =>
          this.userService.ChangeUserWebProcessAccess(
            userId,
            child.PId,
            child.PAccess
          )
        ),
      ];

      // execute all requests in parallel
      const responses = await Promise.all(changeRequests);

      // check for errors
      for (const response of responses) {
        if (!checkAndToastError(response, this.toast)) return;
      }

      // refresh tree
      const mobileNumber = this.userInfo()?.MobileNumber ?? '';
      const updatedTree = await this.getGroupProcesses(mobileNumber);
      this.tree.set(updatedTree);

      this.toast.success('موفق', responses[0].data?.Message ?? '');

      // clear pending changes
      this.parentChanges.clear();
      this.childChanges.clear();
    });
  }

  isSubmitButtonDisabled(): boolean {
    return (
      this.loading() ||
      !this.userInfo() ||
      (this.childChanges.size === 0 && this.parentChanges.size === 0)
    );
  }
}

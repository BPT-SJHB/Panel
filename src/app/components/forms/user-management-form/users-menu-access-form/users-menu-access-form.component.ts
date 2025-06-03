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
  ],
  templateUrl: './users-menu-access-form.component.html',
  styleUrl: './users-menu-access-form.component.scss',
})
export class UsersMenuAccessFormComponent implements OnInit {
  isLoading: boolean = false;
  accessTable?: TreeNode[] = [];
  accessTableFiltered?: TreeNode[] = [];
  cols = [
    { field: 'PGTitle', header: 'نام منو' },
    { field: 'Description', header: 'توضیحات' },
  ];

  selectedNodes: SelectedNodes = {};
  selectedNodesCopy: SelectedNodes = {};

  @Input() userInfo: SoftwareUserInfo = {
  };
  constructor(
    private userAuth: UserAuthService,
    private userManager: UserManagementService
  ) {}

  async ngOnInit() {
    await this.LoadWebProcessGroups_WebProcessesTable();

    this.accessTableFiltered = this.accessTable;
  }

  async SaveChanges() {
    this.isLoading = true;

    for (const key in this.selectedNodesCopy) {
      if (
        this.selectedNodesCopy[key].checked ||
        this.selectedNodesCopy[key].partialChecked
      ) {
        if (key.includes('-')) {
          await this.userManager.ChangeUserWebProcessAccess(
            { UserId: this.userInfo.UserId },
            { PId: Number(key.split('-')[1]), PAccess: false }
          );
        } else {
          await this.userManager.ChangeUserWebProcessGroupAccess(
            { UserId: this.userInfo.UserId },
            { PGId: Number(key), PGAccess: false }
          );
        }
      }
    }

    for (const key in this.selectedNodes) {
      if (
        this.selectedNodes[key].checked ||
        this.selectedNodes[key].partialChecked
      ) {
        if (key.includes('-')) {
          await this.userManager.ChangeUserWebProcessAccess(
            { UserId: this.userInfo.UserId },
            { PId: Number(key.split('-')[1]), PAccess: true }
          );
        } else {
          await this.userManager.ChangeUserWebProcessGroupAccess(
            { UserId: this.userInfo.UserId },
            { PGId: Number(key), PGAccess: true }
          );
        }
      }
    }
    await this.ngOnInit();
    this.isLoading = false;
  }

  private async LoadWebProcessGroups_WebProcessesTable(): Promise<void> {
    const loadedTable = await this.userManager.GetWebProcessGroups_WebProcesses(
      this.userInfo.MobileNumber!
    );
    this.accessTable =
      loadedTable.data?.map((x) => ({
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
}

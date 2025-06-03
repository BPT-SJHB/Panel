import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeTableNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { ApiProcess } from 'app/data/model/api-process.model';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { filter } from 'rxjs';
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
  }

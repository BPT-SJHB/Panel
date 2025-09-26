import { Component } from '@angular/core';
import { TicketCreateFormComponent } from 'app/components/forms/tickets-management-form/ticket-create-form/ticket-create-form.component';
import { FrameHeaderComponent } from 'app/components/shared/layout/header/frame-header/frame-header.component';
import { ThemeManagementComponent } from 'app/components/shared/layout/header/theme-management/theme-management.component';
import { CardModule } from 'primeng/card';
import { SupportButtonComponent } from 'app/components/shared/support-button/support-button.component';
import { FooterComponent } from 'app/components/shared/layout/footer/footer.component';
import { LayoutConfig } from 'app/constants/ui/layout.ui';
import { ExitConfirmationDialogComponent } from 'app/components/shared/exit-confirmation-dialog/exit-confirmation-dialog.component';

@Component({
  selector: 'app-create-page',
  imports: [
    TicketCreateFormComponent,
    FrameHeaderComponent,
    ThemeManagementComponent,
    CardModule,
    SupportButtonComponent,
    FooterComponent,
    ExitConfirmationDialogComponent,
  ],
  templateUrl: './ticket-create-page.component.html',
  styleUrls: ['./ticket-create-page.component.scss'],
})
export class TicketCreatePageComponent {
  readonly layoutUi = LayoutConfig;
}

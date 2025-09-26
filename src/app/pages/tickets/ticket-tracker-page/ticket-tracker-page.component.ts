import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketTrackFormComponent } from 'app/components/forms/tickets-management-form/ticket-track-form/ticket-track-form.component';
import { SupportButtonComponent } from 'app/components/shared/support-button/support-button.component';
import { FooterComponent } from 'app/components/shared/layout/footer/footer.component';
import { ExitConfirmationDialogComponent } from 'app/components/shared/exit-confirmation-dialog/exit-confirmation-dialog.component';
import { ThemeManagementComponent } from 'app/components/shared/layout/header/theme-management/theme-management.component';
import { FrameHeaderComponent } from 'app/components/shared/layout/header/frame-header/frame-header.component';
import { LayoutConfig } from 'app/constants/ui/layout.ui';

@Component({
  selector: 'app-ticket-tracker-page',
  templateUrl: './ticket-tracker-page.component.html',
  styleUrls: ['./ticket-tracker-page.component.scss'],
  imports: [
    TicketTrackFormComponent,
    SupportButtonComponent,
    FooterComponent,
    ExitConfirmationDialogComponent,
    ThemeManagementComponent,
    FrameHeaderComponent,
  ],
})
export class TicketTrackerPageComponent implements OnInit {
  private route = inject(ActivatedRoute); // Angular 16 inject() way
  trackingCode = signal<string>('');
  phoneNumber = signal<string>('');
  readonly layoutUi = LayoutConfig;

  ngOnInit() {
    const trackingCode =
      this.route.snapshot.queryParamMap.get('trackingCode') || '';
    this.trackingCode.set(trackingCode);

    const phone = this.route.snapshot.queryParamMap.get('phone') || '';
    const phoneRegex = /^09\d{9}$/;
    if (phoneRegex.test(phone)) {
      this.phoneNumber.set(phone);
    }
  }
}

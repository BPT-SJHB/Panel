import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TicketServiceManagementService } from './ticket-service-management.service';
import { TicketCreateRequest } from './model/ticket.model';

describe('TicketServiceManagementService', () => {
  let service: TicketServiceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TicketServiceManagementService,
      ],
    });

    service = TestBed.inject(TicketServiceManagementService);
  });

  it('GetCaptcha/VerifyCaptcha should return captcha', async () => {
    const resCaptcha = await service.GetCaptcha();
    expect(resCaptcha.data).toEqual(jasmine.any(Object));

    const res = await service.VerifyCaptcha(
      resCaptcha.data!.id,
      resCaptcha.data!.answer ?? ''
    );
    expect(res.success).toBeTrue();
  });

  it('LoginWithNoAuth should return ticket user', async () => {
    const username = '09100000000';

    const res = await service.LoginWithNoAuth(username);
    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('GetTicketTypes should return ticket types', async () => {
    const res = await service.GetTicketTypes();
    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('GetDepartments should return departments', async () => {
    const res = await service.GetDepartments();
    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('GetTicketStatuses should return ticket statuses', async () => {
    const res = await service.GetTicketStatuses();
    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('CreateTicket should return id and trackCode', async () => {
    const ticket: TicketCreateRequest = {
      title: 'test ticket',
      body: 'تست',
      ticketTypeId: 1,
      departmentId: 2,
      attachments: [],
    };

    const res = await service.CreateTicket(ticket);

    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.id).toBeDefined();
    expect(res.data?.trackCode).toBeDefined();
  });
});

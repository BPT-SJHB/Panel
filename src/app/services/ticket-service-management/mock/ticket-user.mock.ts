import { TicketUser } from '../model/ticket-user.model';

export const mockTicketUser: TicketUser = {
  id: 1,
  username: '09000000000',
  departmentId: 1,
  createdAt: new Date('2025-01-01T00:00:00Z').toISOString(),
  updatedAt: new Date('2025-01-01T00:00:00Z').toISOString(),
};

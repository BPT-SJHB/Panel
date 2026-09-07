export interface TicketUser {
  id: number;
  username: string;
  departmentId?: number;
  createdAt?: string;
  updatedAt?: string;
  roleIds?: number[];
}

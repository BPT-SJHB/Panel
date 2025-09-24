interface TicketUser {
  id: number;
  username: string;
  roleIds: number[];
}

export const mockTicketUser: TicketUser = {
  id: 1,
  username: '09134738238',
  roleIds: [1, 2, 3],
};

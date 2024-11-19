import { GetUser, User } from 'src/types/users';

export const mapUser = (user: GetUser): User => ({
  ...user,
  role: user.roles[0],
  id: user._id
});

export const mapUsers = (users: GetUser[]): User[] => users.map(mapUser);

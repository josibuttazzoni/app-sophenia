import { GetUser, User } from 'src/types/users';

export const mapUser = (user: GetUser): User => ({
  ...user,
  id: user._id
});

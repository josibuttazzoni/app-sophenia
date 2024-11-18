export type LoginResponse = {
  access_token: string;
};

export type LoginRequestVariables = {
  email: string;
  password: string;
  role: string;
};
export interface DeleteUserRequestVariables {
  id: string;
}

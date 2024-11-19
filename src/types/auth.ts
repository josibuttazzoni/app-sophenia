export type LoginResponse = {
  access_token: string;
};

export type LoginRequestVariables = {
  email: string;
  password: string;
  role: string;
};

export interface RegisterRequestVariables {
  fullname: string;
  email: string;
  role: string;
  status: string;
}

export interface RegisterResponse {
  email: string;
  password: string;
  fullname: string;
  roles: string[];
  status: string;
  availability: boolean;
  _id: string;
}

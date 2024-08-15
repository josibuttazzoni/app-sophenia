import { ApiLogin } from 'src/types';

declare module 'next-auth' {
  interface Session {
    loginData: ApiLogin;
  }

  interface User {
    id: string;
    jwt: string;
  }
}

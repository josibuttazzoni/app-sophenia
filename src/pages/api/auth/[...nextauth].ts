import NextAuth, { AuthOptions } from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';

export const authOptions = {
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID || '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
      issuer: process.env.AUTH0_ISSUER || ''
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.jwt = account?.id_token || user.jwt;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        loginData: {
          id: token.id,
          token: token.jwt
        }
      };
    }
  }
} satisfies AuthOptions;

export default NextAuth(authOptions);

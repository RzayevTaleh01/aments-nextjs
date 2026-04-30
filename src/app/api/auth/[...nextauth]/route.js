import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_LOGIN_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";

export const dynamic = "force-dynamic";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        let data;
        try {
          const res = await ApiService.post(
            AUTH_LOGIN_ROUTE,
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          data = res?.data;
        } catch (error) {
          const message = error?.response?.data?.message || error?.message || "Login failed";
          throw new Error(message);
        }

        if (!data?.user || !data?.token) throw new Error("Invalid login response");

        return {
          ...data.user,
          token: { accessToken: data.token },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user?.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user ?? session.user;
      session.token = token.token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

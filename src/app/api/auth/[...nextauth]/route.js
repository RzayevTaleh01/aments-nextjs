import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchWithTimeout } from "@/services/FetchService";
import { AUTH_LOGIN_ROUTE } from "@/configs/apiRoutes";

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
        const baseURL = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;
        if (!baseURL) throw new Error("Backend base URL is not configured");

        const res = await fetchWithTimeout(
          `${baseURL}${AUTH_LOGIN_ROUTE}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
          Number(process.env.NEXT_PUBLIC_REQUEST_TIME_OUT ?? 30000)
        );

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Login failed");

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

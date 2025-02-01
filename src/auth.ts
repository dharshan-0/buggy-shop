import { loginSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },

    session({ session, token }) {
      session.user.username = token.username;
      return session;
    },

    async authorized({ auth }) {
      return !!auth?.user;
    },
  },

  session: {
    strategy: "jwt",
  },

  trustHost: true,

  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text", label: "Username" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid credentials", credentials, parsedCredentials);
          return null;
        }

        return parsedCredentials.data;
      },
    }),
  ],

  pages: {
    signIn: "/register",
  },
});

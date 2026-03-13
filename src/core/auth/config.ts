import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { getUserAuthorizationData } from "@/core/permissions/server";

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "database",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session.user) {
        return session;
      }

      session.user.id = user.id;

      const authorization = await getUserAuthorizationData(user.id);

      session.user.roles = authorization.roles.map((role) => role.id);
      session.user.permissions = authorization.permissions.map(
        (permission) => permission.id,
      );

      return session;
    },
  },
};

import type { NextAuthConfig } from "next-auth";
import prisma from "./utils/prisma";

export const authConfig = {
  // debug: true,
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL(`/dashboard`, nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({session, token, user}) {
      if (token.id && session.user) session.user.id = token.id;
      return session;
    },

    // async session({ session }) {
    //   const userEmail = session.user?.email;
    //   if (!userEmail) {
    //     return session; // Ha nincs email, visszatérünk a sessionnel
    //   }

    //   try {
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: userEmail,
    //       },
    //     });
    
    //     if (user) {
    //       session.userId = user.id; // Hozzáadjuk a userId-t a session-höz
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user:', error);
    //     // Kezeld a hibát szükség szerint
    //   }
    //   return session;
    // },
  },
} satisfies NextAuthConfig;

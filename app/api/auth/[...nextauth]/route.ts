import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import YandexProvider, { YandexProfile } from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";
import MailRuProvider from "next-auth/providers/mailru";
import prisma from "@/prisma/prisma-client";
import { UserRole } from "@prisma/client";
import { ProviderType } from "next-auth/providers/index";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || "",
      clientSecret: process.env.YANDEX_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.default_email || "",
          role: "USER" as UserRole,
        };
      },
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || ''
    }),
    /* 
        
          MailRuProvider({
            clientId: process.env.MAILRU_CLIENT_ID || '',
            clientSecret: process.env.MAILRU_CLIENT_SECRET || ''
          }),
          */
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const findUser = await prisma.user.findFirst({
          where: {
            providerId: account?.providerAccountId,
          },
        });

        if (!findUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              role: user.role,
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
        }
        return true;
      } catch (error) {
        console.log("Error [SIGNIN]", error);
        return false;
      }
    },
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          providerId: token.providerId,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.number = String(findUser.number);
        token.rol = String(findUser.role);
        token.provider = String(findUser.provider);
        token.providerId = String(findUser.providerId);
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.rol as UserRole;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

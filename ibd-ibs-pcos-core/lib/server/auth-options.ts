import { PrismaAdapter } from '@auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '../db';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      if (user.id) {
        const existing = await prisma.userProfile.findUnique({ where: { userId: user.id } });
        if (!existing) {
          await prisma.userProfile.create({ data: { userId: user.id, conditions: JSON.stringify([]), goals: JSON.stringify([]), preferences: JSON.stringify([]), onboardingDone: false } });
        }
        try {
          const { ensureSubscriptionRow } = await import('./db')
          await ensureSubscriptionRow(user.id)
        } catch (e) {
          console.warn('ensureSubscriptionRow failed', e)
        }
      }
      return true;
    },
    async session({ session, user }: any) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login/verify',
    error: '/login/error',
  },
};

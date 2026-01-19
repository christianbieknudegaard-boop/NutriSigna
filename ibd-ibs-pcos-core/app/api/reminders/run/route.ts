import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const secret = req.headers.get('x-cron-secret');
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Simple: fetch enabled reminders and send email using nodemailer
  const reminders = await prisma.reminderSetting.findMany({ where: { enabled: true } });
  const transporter = nodemailer.createTransport({ host: process.env.EMAIL_SERVER_HOST, port: Number(process.env.EMAIL_SERVER_PORT), auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD } });

  for (const r of reminders) {
    if (r.channel === 'email' && r.enabled) {
      // fetch user
      const user = await prisma.user.findUnique({ where: { id: r.userId } });
      if (!user?.email) continue;
      await transporter.sendMail({ from: process.env.EMAIL_FROM, to: user.email, subject: `Påminnelse fra NutriSigna`, text: `Dette er en påminnelse: ${r.kind} kl ${r.timeLocal}` });
    }
  }

  return NextResponse.json({ ok: true });
}

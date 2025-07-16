import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

import { auth } from "@/app/(auth)/auth";
import { user } from "@/db/schema";
import { sendEmail } from "@/lib/aws/ses";

let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
const db = drizzle(client);

export async function POST(req: NextRequest) {
  // Get the current session
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session.user.email;

  // Mark user as subscribed in DB
  await db.update(user).set({ subscribed: true }).where(eq(user.email, email));

  // Send notification email
  await sendEmail({
    to: email,
    subject: "Email Alerts Subscription Confirmed",
    body: `<h1>Congratulations!</h1><p>You will now be notified of upcoming changes.</p>`
  });

  return NextResponse.json({ message: "Congratulations you will now be notified of upcoming changes" });
}

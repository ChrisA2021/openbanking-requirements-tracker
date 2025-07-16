import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/aws/ses";
import { auth } from "@/app/(auth)/auth";

export async function POST(req: NextRequest) {
  // Get the current session
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session.user.email;

  // (Optional) Mark user as subscribed in DB here if you want
  // ...

  // Send notification email
  await sendEmail({
    to: email,
    subject: "Email Alerts Subscription Confirmed",
    body: `<h1>Congratulations!</h1><p>You will now be notified of upcoming changes.</p>`
  });

  return NextResponse.json({ message: "Congratulations you will now be notified of upcoming changes" });
}

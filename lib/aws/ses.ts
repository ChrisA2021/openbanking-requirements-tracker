import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const REGION = process.env.AWS_REGION || "ap-southeast-2"; // Set your region
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@example.com"; // Set your verified SES sender

const sesClient = new SESClient({ region: REGION });

export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: FROM_EMAIL,
  };
  return sesClient.send(new SendEmailCommand(params));
}

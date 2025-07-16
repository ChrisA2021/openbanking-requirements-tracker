import { putIssue, listIssues } from "../lib/aws/dynamodb";
import { sendEmail } from "../lib/aws/ses";
import { getAllUserEmails } from "../db/user-emails";

// Fetch issues from the past 24 hours from DynamoDB
async function fetchNewIssues() {
  const result = await listIssues();
  const issues = result.Items || [];
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return issues.filter((issue: any) => {
    if (!issue.createdAt) return false;
    const createdAt = new Date(issue.createdAt);
    return createdAt >= twentyFourHoursAgo && createdAt <= now;
  });
}

async function main() {
  // 1. Fetch new issues
  const newIssues = await fetchNewIssues();

  // 2. Store new issues in DynamoDB
  for (const issue of newIssues) {
    await putIssue(issue);
  }

  // 3. Get all user emails
  const emails = await getAllUserEmails();

  // 4. Email users about new issues
  for (const email of emails) {
    for (const issue of newIssues) {
      await sendEmail({
        to: email,
        subject: `New Issue: ${issue.title}`,
        body: `<h1>${issue.title}</h1><p>${issue.description}</p>`,
      });
    }
  }
}

export { main };

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

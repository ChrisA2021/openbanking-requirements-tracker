import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "ap-southeast-2"; // Set your region
const ISSUES_TABLE = process.env.ISSUES_TABLE || "IssuesTable"; // Set your table name

const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function putIssue(issue: any) {
  return ddbDocClient.send(
    new PutCommand({
      TableName: ISSUES_TABLE,
      Item: issue,
    })
  );
}

export async function getIssue(issueId: string) {
  return ddbDocClient.send(
    new GetCommand({
      TableName: ISSUES_TABLE,
      Key: { issueId },
    })
  );
}

export async function listIssues() {
  return ddbDocClient.send(
    new ScanCommand({
      TableName: ISSUES_TABLE,
    })
  );
}

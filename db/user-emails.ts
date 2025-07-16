import { db } from "./queries";
import { user, User } from "./schema";
import { eq } from "drizzle-orm";

export async function getAllUserEmails(): Promise<string[]> {
  // Returns all user emails from the User table
  const users = await db.select().from(user);
  return users.map((u: User) => u.email);
}

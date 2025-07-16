import "dotenv/config";
import { main as checkAndNotifyMain } from "./check-and-notify-issues";

const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS;

// Mock Date to June 26, 2025, 5pm
const MOCK_DATE = new Date("2025-06-26T17:00:00.000Z");
const RealDate = Date;
// Patch Date constructor and now()
class MockDate extends RealDate {
  constructor(...args: any[]) {
    if (args.length === 0) {
      super(MOCK_DATE.getTime());
      return;
    }
    // @ts-ignore
    super(...args);
  }
  static now() {
    return MOCK_DATE.getTime();
  }
}
// @ts-ignore
// eslint-disable-next-line
global.Date = MockDate;

async function main() {
  if (!FROM_EMAIL_ADDRESS) {
    throw new Error("FROM_EMAIL_ADDRESS is not set in .env");
  }
  // Run the main logic from check-and-notify-issues
  await checkAndNotifyMain();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

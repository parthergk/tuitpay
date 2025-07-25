import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('24 17 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('25 17 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
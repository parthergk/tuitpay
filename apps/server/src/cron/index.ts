import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('14 13 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('15 13 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
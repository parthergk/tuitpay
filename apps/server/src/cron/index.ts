import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('59 14 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('00 15 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
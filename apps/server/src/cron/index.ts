import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('53 13 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('59 13 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
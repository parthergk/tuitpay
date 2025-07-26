import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('5 10 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('05 11 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('00 17 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('48 12 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
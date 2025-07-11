import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('55 16 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('56 16 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
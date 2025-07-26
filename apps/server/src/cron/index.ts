import cron from "node-cron";
import { cronJobs } from "./AutomationService";

cron.schedule('25 18 * * *', cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata"
});

cron.schedule('26 18 * * *', cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata"
});
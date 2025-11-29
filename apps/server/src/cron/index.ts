import cron from "node-cron";
import { cronJobs } from "./AutomationService";
import { Student, User } from "@repo/db";
import { getTodayDate } from "../utils/dateUtils";

cron.schedule("5 10 * * *", cronJobs.generateMonthlyFees, {
  timezone: "Asia/Kolkata",
});

cron.schedule("05 11 * * *", cronJobs.sendsendFeeReminders, {
  timezone: "Asia/Kolkata",
});

cron.schedule("00 24 * * *", async () => {
  const now = getTodayDate();
  const teachers = await User.find({
    planType: "pro",
    planExpiresAt: {$lt:now}
  });

  for(const teacher of teachers){
    teacher.planType = "free",
    teacher.isPremiumActive = false;

    const students = await Student.find({
      teacherId: teacher.id
    });

    for(const student of students){
      student.stopReminder = true;
    };
    
    await teacher.save();
    // sendEmail(user.email, "Your Yadxy plan has expired...");
  }
}, {});

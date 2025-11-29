export const cronJobs = {
  generateMonthlyFees: () => FeeAutomationService.generateMonthlyFees(),
  sendsendFeeReminders: () => FeeAutomationService.sendFeeReminders(),
};

export async function whatsappSender(contact: string, message: string) {
  
  const response = await fetch("https://live-mt-server.wati.io/466985/api/v1/sendTemplateMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MDA4MmM3Ny0xYjYyLTQxODUtYmM1Yi1hOWRhNWMyMzBmZGIiLCJ1bmlxdWVfbmFtZSI6ImdhdXJhdmt1bWFyMTg0NjRAZ21haWwuY29tIiwibmFtZWlkIjoiZ2F1cmF2a3VtYXIxODQ2NEBnbWFpbC5jb20iLCJlbWFpbCI6ImdhdXJhdmt1bWFyMTg0NjRAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDcvMTAvMjAyNSAxMzo0NjozNiIsInRlbmFudF9pZCI6IjQ2Njk4NSIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.s4UvQNJhp-hx4UgTSlgOW-c7UcXaUlAUum6rTaCydn4`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template_name: "fee_reminder",
      broadcast_name: "TutPayFeeReminder",
      parameters: [
        { name: "1", value: "Gaurav Kumar" },
        { name: "2", value: "₹1500" },
        { name: "3", value: "15 July 2025" },
      ],
      phones: ["917351500283"],
    }),
  });
  console.log(response);
}

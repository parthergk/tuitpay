import twilio from "twilio";

export async function whatsappSender(contact: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  console.log("id's", accountSid, authToken);
  
  const client = twilio(accountSid, authToken);

  try {
    const response = await client.messages.create({
       from: "whatsapp:+14155238886",
       contentSid: "HX72fb5f79fcf30f4b1efdf58c02e34919",
       contentVariables: '{"first_name":"Rohan","order_number":"3T7d87"}',
       to: "whatsapp:+917351500283",
     });
   
     console.log("Response", response);
  } catch (error) {
    console.log("Error:", error);
  }
}

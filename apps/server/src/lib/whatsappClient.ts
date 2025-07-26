import twilio from "twilio";

export async function whatsappSender(contact: string, message: string, name: string) {
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  console.log("id's", accountSid, authToken);
  
  const client = twilio(accountSid, authToken);

  try {
    const response = await client.messages.create({
       from: "whatsapp:+14155238886",
      //  contentSid: "HX72fb5f79fcf30f4b1efdf58c02e34919",
       contentSid: "HX68372c8616d5bbc2a34f597697febc94",
       contentVariables: `{"1":"Gaurav Kumar","2":"July 2025", "3": "1500", "4":"21th July 2025", "5":"Gaurav Kumar", "6":"Rohan Sharma", "7":"Math", "8":"+918475997240"}`,
       to: `whatsapp:+91${contact}` ,
     });
   
     console.log("Response", response);
  } catch (error) {
    console.log("Error:", error);
  }
}

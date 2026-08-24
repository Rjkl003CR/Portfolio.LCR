import { Resend } from "resend";

const resend = new Resend("re_ArzjKrTP_Cb1ooHRWGKYYH9e7U4BtYBNW");

async function testEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ranathungarjklc.23@uom.lk",
      subject: "Test Email",
      html: "<p>This is a test email.</p>",
    });

    if (error) {
      console.error("Resend API Error:", error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (err) {
    console.error("Caught Error:", err);
  }
}

testEmail();

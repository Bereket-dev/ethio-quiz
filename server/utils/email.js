const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (receiver, htmlMessage) => {
  try {
    const resend = await new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiver,
      subject: "Password Reset",
      html: htmlMessage,
    });
    console.error("Email sent successfully");
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

module.exports = sendMail;

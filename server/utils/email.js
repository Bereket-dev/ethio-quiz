const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (receiver, htmlMessage) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const email = await resend.emails.send({
      from: "bereketdesalegn097@gmail.com",
      to: receiver,
      subject: "Password Reset",
      html: htmlMessage,
    });
    console.error("Email sent successfully:", email.id);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

module.exports = sendMail;

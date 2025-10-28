const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (receiver, htmlMessage, emailReason) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Ethio quiz <noreply@ethioquiz.com.et>",
      to: receiver,
      subject: emailReason,
      html: htmlMessage,
    });

    if (error) {
      console.error("Email sending failed!", error);
      return;
    }

    console.error("Email sent successfully:", data.id);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

module.exports = sendMail;

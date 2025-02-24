const nodemailer = require("nodemailer");
const twilio = require("twilio");
require("dotenv").config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio setup
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Send email notification
const sendEmailNotification = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email send failed:", error);
  }
};

// Send SMS notification
const sendSMSNotification = async (phone, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("SMS send failed:", error);
  }
};

module.exports = { sendEmailNotification, sendSMSNotification };

const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // false for STARTTLS
  auth: {
    user: 'helpinghandcfp@outlook.com',
    pass: 'HelpingHand1@'
  },
  tls: {
    rejectUnauthorized: true
  }
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'helpinghandcfp@outlook.com',
      to: email,
      subject: subject,
      html: html
    });
    console.log(`${subject} email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending ${subject} email:`, error);
    throw error;
  }
};

module.exports = {
  sendEmail
};

const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'smtp.office365.com',
  auth: {
    user: 'helpinghandcfp@outlook.com',
    pass: 'HelpingHand1@'
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

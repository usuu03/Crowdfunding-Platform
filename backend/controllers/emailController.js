const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helpinghandcfp@gmail.com',
    pass: 'HelpingHand1@'
  }
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'helpinghandcfp@gmail.com',
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

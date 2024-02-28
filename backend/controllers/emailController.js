const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
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

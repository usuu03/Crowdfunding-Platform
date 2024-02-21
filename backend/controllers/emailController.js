const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send registration confirmation email
const sendRegistrationConfirmationEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Registration Confirmation',
      html: `<p>Dear ${name},</p><p>Thank you for registering on our platform.</p>`
    });
    console.log('Registration confirmation email sent');
  } catch (error) {
    console.error('Error sending registration confirmation email:', error);
    throw error;
  }
};

// Function to send profile update confirmation email
const sendProfileUpdateConfirmationEmail = async (email, name, receiveEmails) => {
  try {
    if (receiveEmails) {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Profile Update Confirmation',
        html: `<p>Dear ${name},</p><p>Your profile has been successfully updated.</p>`
      });
      console.log('Profile update confirmation email sent');
    }
  } catch (error) {
    console.error('Error sending profile update confirmation email:', error);
    throw error;
  }
};

// Function to send campaign creation confirmation email
const sendCampaignCreationConfirmationEmail = async (email, campaignTitle, receiveEmails) => {
  try {
    if (receiveEmails) {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Campaign Creation Confirmation',
        html: `<p>Dear User,</p><p>Your campaign "${campaignTitle}" has been successfully created.</p>`
      });
      console.log('Campaign creation confirmation email sent');
    }
  } catch (error) {
    console.error('Error sending campaign creation confirmation email:', error);
    throw error;
  }
};

// Function to send donation confirmation email
const sendDonationConfirmationEmail = async (email, amount, campaignTitle, receiveEmails) => {
  try {
    if (receiveEmails) {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Donation Confirmation',
        html: `<p>Dear User,</p><p>Thank you for your donation of $${amount} to the campaign "${campaignTitle}".</p>`
      });
      console.log('Donation confirmation email sent');
    }
  } catch (error) {
    console.error('Error sending donation confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendRegistrationConfirmationEmail,
  sendProfileUpdateConfirmationEmail,
  sendCampaignCreationConfirmationEmail,
  sendDonationConfirmationEmail
};

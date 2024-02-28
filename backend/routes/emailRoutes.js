const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-email', async (req, res) => {
  const { email, subject, html } = req.body;

  try {
    await emailController.sendEmail(email, subject, html);
    res.status(200).json({ message: `${subject} email sent successfully` });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;

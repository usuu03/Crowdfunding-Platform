// user.js
const express = require('express');
const router = express.Router();
const { getUserById, updateUserById } = require('../controllers/User');
const { authenticateUser } = require('../middleware/authentication');

// Fetch user data by ID
router.get('/:userId', authenticateUser, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update user data
router.put('/:userId', authenticateUser, async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    const updatedUser = await updateUserById(userId, updatedUserData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lastName, firstName, password } = req.body;

    // Hash the password securely with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateQuery = `UPDATE Users
      SET lastName=?, firstName=?, password=?
      WHERE userId=?`;

    const values = [lastName, firstName, hashedPassword, userId];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating user details:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      } else {
        console.log('User details updated successfully');
        res.status(200).json({ message: 'User details updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  updateUserDetails,
};

/*
 * Filename: donationController.js
 * Author: Usunobu Edeaghe
 * Date: December 11, 2023
 * Description: This file contains controllers for the Donation Table in the Database
 *
 */

const db = require("../config/dbConfig");

const getUserDonatedAmount = async (req, res) => {
  try {
    const userID = req.user.userId;

    const amountQuery = `
    SELECT IFNULL(SUM(amount), 0.0) AS totalDonationAmount
    FROM Donation
    WHERE userID = ?;
  `;

    const [results] = await db.promise().query(amountQuery, [userID]);

    const totalDonationAmount = results[0].totalDonationAmount;

    res.status(200).json({ totalDonationAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserDonatedAmount,
};

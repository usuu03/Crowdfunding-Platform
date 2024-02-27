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

const addDonation = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { campaignID } = req.params; // Assuming the parameter name is 'campaignId'
    const { amount, anonymous } = req.body;
    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0];

    const query =
      "INSERT INTO Donation (userID, campaignID, amount, donationDate, anonymous) VALUES (?, ?, ?, ?, ?)";

    const [results] = await db
      .promise()
      .query(query, [userID, campaignID, amount, currentDate, anonymous]);

    res.status(201).json({ message: "Successfully donated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Donation Unsuccessful: ${error.message}` });
  }
};

module.exports = {
  getUserDonatedAmount,
  addDonation,
};

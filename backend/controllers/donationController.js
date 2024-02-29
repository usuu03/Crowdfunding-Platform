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
    const { campaignID } = req.params;
    const { amount, anonymous } = req.body;
    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0];

    // Fetch user's current coin balance
    const userQuery = "SELECT coins FROM Users WHERE userID = ?";
    const [userResults] = await db.promise().query(userQuery, [userID]);
    const currentUserCoins = userResults[0].coins;

    // Check if the user has enough coins
    if (currentUserCoins < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch campaign's current goal and currentAmount
    const campaignQuery =
      "SELECT goal, currentAmount FROM Campaign WHERE campaignID = ?";
    const [campaignResults] = await db
      .promise()
      .query(campaignQuery, [campaignID]);
    const currentCampaignGoal = campaignResults[0].goal;
    const currentCampaignAmount = campaignResults[0].currentAmount;

    // Increment the currentAmount by the donation amount
    const updatedAmount = currentCampaignAmount + amount;

    // Update the campaign's currentAmount in the database
    const updateCampaignQuery =
      "UPDATE Campaign SET currentAmount = ? WHERE campaignID = ?";
    await db.promise().query(updateCampaignQuery, [updatedAmount, campaignID]);

    // Subtract the expense amount from the user's coins
    const updatedCoins = currentUserCoins - amount;

    // Update the user's coins in the database
    const updateUserQuery = "UPDATE Users SET coins = ? WHERE userID = ?";
    await db.promise().query(updateUserQuery, [updatedCoins, userID]);

    // Insert the donation record
    const donationQuery =
      "INSERT INTO Donation (userID, campaignID, amount, donationDate, anonymous) VALUES (?, ?, ?, ?, ?)";
    await db
      .promise()
      .query(donationQuery, [
        userID,
        campaignID,
        amount,
        currentDate,
        anonymous,
      ]);

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

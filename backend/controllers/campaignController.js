/*
 * Filename: campaignController.js
 * Author: Michael Omoyele
 * Date: October 25, 2023
 * Description: This file contains endpoints for the Campaign Table in the Database
 *
 */

const db = require("../config/dbConfig");

/**
 * @function getAllCampaigns
 * @description Fetches all campaigns from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const getAllCampaigns = async (req, res) => {
  try {
    const query = "SELECT * FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }

    const campaigns = results.map((campaign) => ({
      title: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      currentAmount: campaign.currentAmount,
      goal: campaign.goal,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStaus,
      posterImage: campaign.posterImage,
    }));

    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function getAllCategories
 * @description Fetches all unique campaign categories from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of campaign categories.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const getAllCategories = async (req, res) => {
  try {
    const query = "SELECT DISTINCT category FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No Categories found" });
    }

    const categories = results.map((result) => result.category);

    res.json(categories);
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function getAllCountries
 * @description Fetches all unique campaign countries from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of campaign countries.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const getAllCountries = async (req, res) => {
  try {
    const query = "SELECT DISTINCT country FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No Regions found" });
    }

    const countries = results.map((result) => result.country);

    res.json(countries);
  } catch (error) {
    console.error("Error fetching region data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params; // Extract campaignId from request parameters

    const query = "SELECT * FROM Campaign WHERE campaignID = ?";
    const [results] = await db.promise().query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No campaign found" });
    }

    const campaign = results[0]; // Take the first result


    const formattedCampaign = {
      campaignID: campaign.campaignID,
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      goal: campaign.goal,
      followerCount: campaign.followerCount,
      currentAmount: campaign.currentAmount,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStatus,
      // Use the base64 image data
      posterImage: campaign.posterImage,
      //posterImage: campaign.posterImage,
    };

    res.status(200).json(formattedCampaign);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/**
 * @function addCampaign
 * @description Adds a new campaign to the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with a success message.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const addCampaign = async (req, res) => {
  const userID = req.user.userId;
  const {
    campaignTitle,
    campaignDescription,
    goal,
    category,
    country,
    endDate,
    posterImage,
  } = req.body;

  const insertQuery = `INSERT INTO Campaign
    (campaignTitle, campaignDescription, userID, goal, category, country, endDate, posterImage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    campaignTitle,
    campaignDescription,
    userID,
    goal,
    category,
    country,
    endDate,
    posterImage,
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting campaign:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    } else {
      console.log("Campaign inserted successfully");
      res.status(201).json({ message: "Campaign created successfully" });
    }
  });
};

/**
 * @function searchCampaigns
 * @description Searches campaigns in the database based on a provided title.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of matching campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const searchCampaigns = async (req, res) => {
  try {
    const { campaignTitle } = req.body;

    const insertQuery = "SELECT * FROM Campaign WHERE campaignTitle LIKE ?";
    const [results] = await db
      .promise()
      .query(insertQuery, [`%${campaignTitle}%`]);

    if (results.length === 0) {
      res.status(404).json({ message: "No results" });
      return;
    }

    const campaigns = results.map((campaign) => ({
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      goal: campaign.goal,
      currentAmount: campaign.currentAmount,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStatus,
      posterImage: campaign.posterImage,
    }));

    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function getUserCampaigns
 * @description Fetches campaigns created by the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of user's campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const getUserCampaigns = async (req, res) => {
  try {
    const userID = req.user.userId;

    const sqlQuery = "SELECT * FROM Campaign WHERE userID=?";
    const [results] = await db.promise().query(sqlQuery, [userID]);

    if (results.length === 0) {
      res.status(404).json({ message: "No Created Campaigns" });
      return;
    }

    const campaigns = results.map((campaign) => ({
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      goal: campaign.goal,
      currentAmount: campaign.currentAmount,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStatus,
      posterImage: campaign.posterImage,
    }));

    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function getUserDonatedCampaigns
 * @description Fetches campaigns donated by the authenticated User
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of user's donated campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */

const getUserDonatedCampaigns = async (req, res) => {
  try {
    const userID = req.user.userId;

    const sqlQuery = `
      SELECT c.*
      FROM Campaign c
      JOIN Donation d ON c.campaignID = d.campaignID
      WHERE d.userID = ?;
    `;

    const [results] = await db.promise().query(sqlQuery, [userID]);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No donated Campaigns by the User" });
    }

    const campaigns = results.map((campaign) => ({
      campaignID: campaign.campaignID,
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      goal: campaign.goal,
      currentAmount: campaign.currentAmount,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStatus,
      posterImage: campaign.posterImage,
    }));

    return res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function getUserFollowedCampaigns
 * @description Fetches campaigns followed by the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of user's followed campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const getUserFollowedCampaigns = async (req, res) => {
  try {
    const userID = req.user.userId;

    const sqlQuery = `
      SELECT c.*
      FROM Campaign c
      JOIN User_Followed_Campaigns fc ON c.campaignID = fc.campaignID
      WHERE fc.userID = ?;
    `;

    const [results] = await db.promise().query(sqlQuery, [userID]);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No Campaigns followed by the User" });
    }

    const campaigns = results.map((campaign) => ({
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription,
      goal: campaign.goal,
      currentAmount: campaign.currentAmount,
      category: campaign.category,
      country: campaign.country,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      creationDate: campaign.creationDate,
      campaignStatus: campaign.campaignStatus,
      posterImage: campaign.posterImage,
    }));

    return res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function updateCampaign
 * @description Updates the Campaign Information
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with a string showing if the Campaign was updated.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const updateCampaigns = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { id } = req.params;
    const update = req.body;

    //Updating the Campaign in the Campaign Table
    const updateQuery =
      "UPDATE Campaign SET ? WHERE campaignID = ? AND userID = ?";
    const [results] = await db
      .promise()
      .query(updateQuery, [update, id, userID]);

    console.log(results);

    //Checking if the Campaign exists
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Campaign not Found" });
    }

    res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function deleteCampaign
 * @description Delete a Campaign from the Table
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of the updated Campaign.
 * @throws {object} JSON response with an error message if an error occurs.
 */
const deleteCampaign = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { id } = req.params;

    const deleteQuery =
      "DELETE FROM Campaign WHERE campaignID = ? AND userID = ?";

    const [results] = await db.promise().query(deleteQuery, [id, userID]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Successfully deleted Campaign" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getAllCampaigns,
  getAllCategories,
  getAllCountries,
  getCampaignById,
  addCampaign,
  searchCampaigns,
  getUserCampaigns,
  getUserFollowedCampaigns,
  getUserDonatedCampaigns,
  updateCampaigns,
  deleteCampaign,
};

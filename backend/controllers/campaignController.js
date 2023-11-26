/*
 * Filename: campaignController.js
 * Author: Michael Omoloye
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

    res.json(campaigns);
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
 * @function getUserFollowedCampaigns
 * @description Fetches campaigns followed by the authenticated user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with an array of user's followed campaigns.
 * @throws {object} JSON response with an error message if an error occurs.
 */
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
      JOIN user_followed_campaigns fc ON c.campaignID = fc.campaignID
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

module.exports = {
  getAllCampaigns,
  getAllCategories,
  getAllCountries,
  addCampaign,
  searchCampaigns,
  getUserCampaigns,
  getUserFollowedCampaigns,
};

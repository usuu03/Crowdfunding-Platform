const db = require("../config/dbConfig");

//Getting all the Campaigns
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

//Getting all categories from the Campaigns
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

//Adding a New Campaign
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

module.exports = {
  getAllCampaigns,
  getAllCategories,
  getAllCountries,
  addCampaign,
  searchCampaigns,
};

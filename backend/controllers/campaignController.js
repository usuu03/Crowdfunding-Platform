const db = require("../config/dbConfig");

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
      region: campaign.region,
    }));

    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

const getAllRegions = async (req, res) => {
  try {
    const query = "SELECT DISTINCT region FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No Regions found" });
    }

    const regions = results.map((result) => result.region);

    res.json(regions);
  } catch (error) {
    console.error("Error fetching region data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Adding a New Campaign
const addCampaign = async (req, res) => {
  const {
    campaignTitle,
    campaignDescription,

    goal,
    category,
    region,
    endDate,
    posterImage,
  } = req.body;

  const insertQuery = `INSERT INTO Campaign
    (campaignTitle, campaignDescription, userID, goal, category, region, endDate, posterImage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    campaignTitle,
    campaignDescription,
    req.user.userID,
    goal,
    category,
    region,
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

module.exports = {
  getAllCampaigns,
  getAllCategories,
  getAllRegions,
  addCampaign,
};

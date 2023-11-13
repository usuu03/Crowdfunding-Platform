const db = require("../config/dbConfig");

const getAllCampaigns = async (req, res) => {
  try {
    const query = "SELECT * FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      res.status(404).json({ message: "No campaigns found" });
      return;
    }

    const campaigns = results.map((campaign) => ({
      title: campaign.campaignTitle,
      currentAmount: campaign.currentAmount,
      goal: campaign.goal,
    }));

    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Getting all categories from the Camapaigns
const getAllCategories = async (req, res) => {
  try {
    const query = "SELECT DISTINCT category FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      res.status(404).json({ message: "No Categories found" });
      return;
    }

    const categories = results.map((result) => result.category);

    res.json(categories);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Getting all Regions from the campaigns
const getAllRegions = async (req, res) => {
  try {
    const query = "SELECT DISTINCT region FROM Campaign";
    const [results] = await db.promise().query(query);

    if (results.length === 0) {
      res.status(404).json({ message: "No Regions found" });
      return;
    }

    const regions = results.map((result) => result.region);

    res.json(regions);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllCampaigns, getAllCategories, getAllRegions };

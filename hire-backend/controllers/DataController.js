const {
  Freelancer,
  Category,
  Freelancer_Category,
  Freelancer_Skills,
  Applicants,
  Bids,
  Job_Postings,
  Skills,
} = require("../utils/InitializeModels");

async function FetchCategories(req, res, next) {
  try {
    const categories = await Category.findAll();
    console.log(categories);
    res.status(200).json({ categories: categories });
  } catch (e) {
    next(e);
  }
}
const FetchSkills = async (req, res, next) => {
  console.log("In fetch skills");

  // Extract categories from the request body
  const categories = req.query.categories;

  // Validate the categories input
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid or missing categories array" });
  }

  try {
    // Query all skills where category_id matches any of the categories
    const skills = await Skills.findAll({
      where: {
        category_id: categories, // Sequelize handles string IDs fine
      },
      raw: true, // Return plain objects without metadata
    });

    console.log("Fetched skills:", skills);
    res.status(200).json(skills);
  } catch (e) {
    console.error("Error fetching skills:", e);
    next(e);
  }
};

module.exports = { FetchCategories, FetchSkills };

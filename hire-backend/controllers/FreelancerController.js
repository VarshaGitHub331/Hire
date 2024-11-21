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
const UpdateProfile = (req, res, next) => {
  const { resume_url, profile, linkedin, cost, user_id } = req.body;
  if (!user_id) {
    res.status(404).json("user_id cannot be null");
  }
  try {
    const updated = Freelancer.update(
      {
        profile,
        linkedin,
        cost,
        resume: resume_url,
      },
      { where: { user_id: user_id } }
    );
    res.status(201).json(updated);
  } catch (e) {
    next(e);
  }
};
const UpdateCategories = async (req, res, next) => {
  console.log("I AM IN THE UPDATING CATEGORIES ONE");
  const { categories, user_id } = req.body;
  if (!user_id) {
    res.status(404).json("user_id cannot be null here");
  }
  console.log(req.body);
  try {
    for (c of categories) {
      const category_item = await Category.findOne({
        where: { category_id: c },
      });
      console.log(category_item);
      if (category_item) {
        const row_exists = await Freelancer_Category.findOne({
          where: { user_id, category_id: category_item.category_id },
        });
        if (!row_exists) {
          await Freelancer_Category.create({
            user_id,
            category_id: category_item.category_id,
          });
          console.log("done inserting into freelancer_categories");
        }
      } else {
        console.log("NO CATEORY FOUND");
      }
    }
    res.status(201).json({ update: true });
  } catch (e) {
    next(e);
  }
  next();
};
const AddSkills = async (req, res, next) => {
  console.log("In Add Skills");
  console.log(req.body);
  const { skills, user_id } = req.body;
  if (!user_id) {
    res.status(401).json("This is invalid username");
  }
  try {
    for (s of skills) {
      const exist = await Freelancer_Skills.findOne({
        where: { user_id: user_id, skill_id: s.skill_id },
      });
      if (!exist) {
        await Freelancer_Skills.create({
          user_id: user_id,
          skill_id: s.skill_id,
        });
        console.log("inserted skill");
      }
    }
    res.status(200).json("Inserted");
  } catch (e) {
    next(e);
  }
};
const BidPosting = async (req, res, next) => {
  const { user_id, job_id, bid_amount, bid_details } = req.body;
  if (!user_id || !job_id || !bid_amount || !bid_details) {
    res.status(401).json("Please enter complete details");
  }
  try {
    const applied = await Applicants.findOne({
      where: {
        applicant_id: user_id,
        job_id: job_id,
      },
    });
    if (!applied) {
      console.log("doing next");
      const newApplicant = await Applicants.create({
        job_id,
        applicant_id: user_id,
      });
      console.log(newApplicant);
    }
    next();
  } catch (e) {
    next(e);
  }
};
const BidDetails = async (req, res, next) => {
  const { bid_amount, bid_details, user_id, job_id } = req.body;
  try {
    const job = await Job_Postings.findOne({ where: { job_id } });
    const bid = await Bids.create({
      job_posting_id: job_id,
      bidder_id: user_id,
      bid_amount,
      bid_details,
      bid_status: "pending",
      client_id: job.user_id,
    });
    res.status(202).json("Bid has been created");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  UpdateProfile,
  UpdateCategories,
  AddSkills,
  BidPosting,
  BidDetails,
};

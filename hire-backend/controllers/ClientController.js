const {
  Client,
  Job_Postings,
  Job_Categories,
  Job_Skills,
} = require("../utils/InitializeModels");

const UpdateProfile = async (req, res, next) => {
  const { contact_number, user_id } = req.body;
  if (!user_id) {
    res.status(404).json("User_id cannot be null");
  }
  try {
    const updated = await Client.update(
      { contact_number },
      { where: { user_id: user_id } }
    );
    res.status(201).json(updated);
  } catch (e) {
    next(e);
  }
};
const CreatePosting = async (req, res, next) => {
  /*
| job_id      | int                  | NO   | PRI | NULL    | auto_increment |
| user_id     | int                  | YES  | MUL | NULL    |                |
| title       | varchar(255)         | YES  |     | NULL    |                |
| description | text                 | YES  |     | NULL    |                |
| budget      | decimal(10,2)        | YES  |     | NULL    |                |
| location    | varchar(255)         | YES  |     | NULL    |                |
| duration    | varchar(255)         | YES  |     | NULL    |                |
| created_at  | datetime             | YES  |     | NULL    |                |
| status      | enum('True','False') | NO   |     | NULL    |                |
| updated_at  | datetime             | YES  |     | NULL    |                |*/
  const {
    user_id,
    title,
    description,
    location,
    duration,
    budget,
    skills,
    categories,
  } = req.body;
  if (!user_id || !title || !description || !location || !duration || !budget)
    res.status(404).json("Please enter proper details for creating posting");
  if (!req.body.categories || !req.body.skills)
    res.status(404).json("Please enter job categories and job skills");
  else {
    try {
      const newJob = await Job_Postings.create({
        user_id,
        title,
        description,
        budget,
        location,
        duration,
        status: "True",
      });
      req.body.job_id = newJob.job_id;
      next();
    } catch (e) {
      next(e);
    }
  }
};
const PostingCategory = async (req, res, next) => {
  const { categories, job_id } = req.body;
  console.log(job_id);
  for (c of categories) {
    try {
      const found = await Job_Categories.findOne({
        where: { job_id, category_id: c },
      });
      if (!found) {
        await Job_Categories.create({ category_id: c, job_id });
        console.log("Posted Category");
      }
    } catch (e) {
      next(e);
    }
  }
  next();
};
const PostingSkills = async (req, res, next) => {
  const { skills, job_id } = req.body;
  for (s of skills) {
    try {
      const found = await Job_Skills.findOne({
        where: { job_id, skill_id: s },
      });
      if (!found) {
        await Job_Skills.create({ job_id, skill_id: s });
        console.log("Posted Skill");
      }
    } catch (e) {
      next(e);
    }
  }
  next();
};
const RemovePosting = async (req, res, next) => {
  console.log("I was called");
  const { job_id } = req.params;
  try {
    const job = await Job_Postings.findOne({ where: { job_id: job_id } });
    job.status = false;
    res.status(200).json("Posting removed");
  } catch (e) {
    next(e);
  }
};
module.exports = {
  UpdateClientProfile: UpdateProfile,
  CreatePosting,
  PostingCategory,
  PostingSkills,
  RemovePosting,
};

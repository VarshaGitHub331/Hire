const express = require("express");

const {
  UpdateProfile,
  UpdateCategories,
  AddSkills,
  BidPosting,
  BidDetails,
} = require("../controllers/FreelancerController");
const { generateBidProposal } = require("../controllers/AIControllers");
const { AuthUser } = require("../controllers/UserController");
const WrapAsync = require("../utils/WrapAsync");
const FreelancerRouter = express.Router();
const upload = require("../utils/Multer");
const uploadResume = require("../utils/FileUpload");
const { Freelancer } = require("../utils/InitializeModels");
const { Freelancer_Skills, Skills } = require("../utils/InitializeModels");

FreelancerRouter.post("/updateProfile", AuthUser, WrapAsync(UpdateProfile));
FreelancerRouter.post(
  "/updateCategories",
  AuthUser,
  WrapAsync(UpdateCategories)
);
FreelancerRouter.post("/addSkills", AuthUser, WrapAsync(AddSkills));
FreelancerRouter.post(
  "/bidPosting",
  // AuthUser,
  WrapAsync(BidPosting),
  WrapAsync(BidDetails)
);
FreelancerRouter.post(
  "/uploadResume",
  AuthUser,
  upload.single("resume"), // 'resume' is the name of the form field
  uploadResume, // Middleware to upload file to Cloudinary
  async (req, res) => {
    const { user_id } = req.body;
    if (!req.resumeUrl) {
      res.status(400).json("No such file has been uploaded");
    }
    try {
      await Freelancer.update(
        { resume: req.resumeUrl },
        {
          where: {
            user_id: user_id,
          },
        }
      );
    } catch (e) {
      next(e);
    }
    // Send back the Cloudinary URL
    res.status(200).json({
      message: "Resume uploaded successfully!",
      resumeUrl: req.resumeUrl, // Cloudinary URL of the uploaded file
    });
  }
);

FreelancerRouter.get("/generateProposal", async (req, res, next) => {
  const { user_id, job_description } = req.body;
  try {
    // Fetch skill_ids for the freelancer
    const freelancerSkillsData = await Freelancer_Skills.findAll({
      attributes: ["skill_id"], // Use the string 'skill_id'
      where: { user_id: user_id },
    });

    // Extract skill_ids from the results
    const skillIds = freelancerSkillsData.map((skill) => skill.skill_id);

    // Fetch the skill names based on the skill_ids
    const skillNames = await Skills.findAll({
      attributes: ["skill_name"], // Use the string 'skill_name'
      where: { skill_id: skillIds }, // skill_id should be an array for `IN` condition
    });

    // Convert skill names into a comma-separated string
    const freelancerSkills = skillNames
      .map((skill) => skill.skill_name)
      .join(", ");

    console.log("The skills of the freelancer are:", freelancerSkills);

    // Fetch the freelancer profile
    const freelancerProfileData = await Freelancer.findOne({
      attributes: ["profile"], // Use the string 'profile'
      where: { user_id: user_id },
    });

    const freelancerProfile = freelancerProfileData
      ? freelancerProfileData.profile
      : "";

    console.log("The profile of the freelancer is:", freelancerProfile);

    // Call the function to generate the bid proposal
    await generateBidProposal(
      job_description,
      freelancerSkills,
      freelancerProfile
    );

    res.status(200).send("Bid proposal generated successfully");
  } catch (e) {
    console.error("Error:", e);
    next(e);
  }
});

module.exports = FreelancerRouter;

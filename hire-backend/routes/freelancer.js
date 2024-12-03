const express = require("express");

const {
  UpdateProfile,
  UpdateCategories,
  AddSkills,
  BidPosting,
  BidDetails,
  insertFoundSkills,
  CreateGig,
  AddGigSkills,
} = require("../controllers/FreelancerController");
const {
  extractSkills,
  findSimilarSkills,
} = require("../controllers/AIControllers");
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

FreelancerRouter.get(
  "/profileUser",
  WrapAsync(extractSkills),
  WrapAsync(findSimilarSkills),
  WrapAsync(insertFoundSkills)
);
FreelancerRouter.get(
  "/createGig",
  WrapAsync(CreateGig),
  WrapAsync(extractSkills),
  WrapAsync(findSimilarSkills),
  WrapAsync(AddGigSkills)
);
module.exports = FreelancerRouter;

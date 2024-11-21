const sequelize = require("./Connection.js");
const { DataTypes } = require("sequelize");
const User = require("../models/User.js")(sequelize, DataTypes);
const Client = require("../models/Client.js")(sequelize, DataTypes);
const Category = require("../models/Category.js")(sequelize, DataTypes);
const Freelancer_Category = require("../models/Freelancer_Category.js")(
  sequelize,
  DataTypes
);
const Freelancer_Skills = require("../models/Freelancer_Skills.js")(
  sequelize,
  DataTypes
);
const Freelancer = require("../models/Freelancers.js")(sequelize, DataTypes);
const Job_Categories = require("../models/Job_Categories.js")(
  sequelize,
  DataTypes
);
const Job_Skills = require("../models/Job_Skills.js")(sequelize, DataTypes);
const Order = require("../models/Order.js")(sequelize, DataTypes);
const Review = require("../models/Reviews.js")(sequelize, DataTypes);
const Job_Postings = require("../models/Job_Postings.js")(sequelize, DataTypes);
const Skills = require("../models/Skills.js")(sequelize, DataTypes);
const Applicants = require("../models/Applicants.js")(sequelize, DataTypes);
const Bids = require("../models/Bids.js")(sequelize, DataTypes);
const Conversation = require("../models/Conversation.js")(sequelize, DataTypes);
const Messages = require("../models/Messages.js")(sequelize, DataTypes);
const User_Messages = require("../models/UserMessages.js")(
  sequelize,
  DataTypes
);
console.log(Bids);
module.exports = {
  User,
  Client,
  Category,
  Freelancer_Category,
  Freelancer_Skills,
  Freelancer,
  Job_Categories,
  Job_Skills,
  Order,
  Review,
  Job_Postings,
  Skills,
  Applicants,
  Bids,
  Conversation,
  Messages,
  User_Messages,
};

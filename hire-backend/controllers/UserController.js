const { User, Freelancer, Client } = require("../utils/InitializeModels");
require("dotenv").config(); // Load environment variables from .env file

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function HashPassword(password) {
  try {
    const SaltRound = 10;
    const hashPassword = await bcrypt.hash(password, SaltRound);
    return hashPassword;
  } catch (e) {
    console.log(e);
  }
}
const RegisterUser = async (req, res, next) => {
  console.log("REGISTERING USER");
  try {
    const { email, first_name, last_name, role, password } = req.body;
    console.log(req.body);
    const hashPassword = await HashPassword(password);
    console.log(hashPassword);
    const newUser = await User.create({
      email: email,
      first_name,
      last_name,
      password: hashPassword,
      role,
    });
    if (role === "freelancer") {
      const newFreelancer = await Freelancer.create({
        user_id: newUser.user_id,
        resume: " ",
        profile: " ",
        cost: 0,
      });
    } else if (role === "company") {
      const { company_name } = req.body;
      const newClient = await Client.create({
        user_id: newUser.user_id,
        company_name,
        contact_email: email,
      });
    }
    const user = {
      id: newUser.user_id,
      user_name: first_name,
      user_id: newUser.user_id,
      role: newUser.role,
    };
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json(token);
  } catch (e) {
    next(e);
  }
};
const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        { user_id: user.user_id, user_name: user.first_name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json(token);
    } else {
      res.status(201).json({ isValid: "Auth Fail" });
    }
  } catch (e) {
    next(e);
  }
};
const AuthUser = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);
  console.log(req.body);
  console.log("The header");
  console.log(req.header("Authorization"));
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid token");
    }
    console.log("I A HERE");
    console.log(decoded);
    next();
  });
};
module.exports = { RegisterUser, LoginUser, AuthUser };

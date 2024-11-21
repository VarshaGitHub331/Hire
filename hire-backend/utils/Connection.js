const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  database: "freelancer_final",
  username: "root",
  password: "Varsha@SQL123",
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then((data) => {
    console.log("CONNECTED AND AUTHENTICATED");
  })
  .catch((e) => {
    console.log(e);
    console.log("ERROR HAPPENED");
  });
sequelize.sync({ alter: true }).then(() => {
  console.log("Models synchronized.");
});
module.exports = sequelize;

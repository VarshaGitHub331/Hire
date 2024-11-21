const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UserRouter = require("./routes/user.js");
const FreelancerRouter = require("./routes/freelancer.js");
const ClientRouter = require("./routes/client.js");
const OrderRouter = require("./routes/order.js");
const dataRouter = require("./routes/Data.js");
const Data = require("./routes/Data.js");
const cors = require("cors");
// Insert a new user
/*async function createNewUser() {
  try {
    const newUser = await User.create({
      email: "new4@example.com",
      first_name: "John",
      last_name: "Doe",
      password: "securepassword123", // In a real app, ensure this is hashed!
      role: "freelancer",
    });
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error inserting new user:", error);
  }
}
createNewUser();*/
// Call the function
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UserRouter);
app.use("/freelancer", FreelancerRouter);
app.use("/client", ClientRouter);
app.use("/order", OrderRouter);
app.use("/data", dataRouter);

server.listen(3001, () => {
  console.log("Server listening at 3001");
});
module.exports = { io };

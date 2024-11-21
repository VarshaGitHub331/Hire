const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to, orderId, subject, text, html) => {
  const callBack = `https://589c-45-112-145-119.ngrok-free.app/order/acceptOrder/${orderId}`;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: to, // Recipient's email address
      subject: subject, // Email subject
      text: text, // Plain text body
      html: `<p>Click <a href="${callBack}">here</a> to accept your order.</p>`, // HTML body (optional)
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const createOrderAndSendMail = async (bid, models) => {
  console.log("BRUHHHH");
  console.log("I was here", bid, "is the bid bro");
  const { Job_Postings, Order, User } = models;
  try {
    console.group("HERE");
    const client_id = bid.client_id;
    const freelancer_id = bid.bidder_id;
    const job_id = bid.job_posting_id;
    if (!freelancer_id || !job_id || !client_id)
      res.status(402).json("Insufficient Data");
    const job = await Job_Postings.findOne({ where: { job_id } });
    if (job) {
      const newOrder = await Order.create({
        creator: client_id,
        acceptor: freelancer_id,
        job_posting_id: job_id,
        status: "created",
        createdAt: new Date(), // Only if you want to explicitly set them
        updatedAt: new Date(),
      });
      console.log("Sending to", freelancer_id);
      const foundUser = await User.findOne({
        where: { user_id: freelancer_id },
      });

      sendMail(foundUser.email, "Bid Accepted", "Your bid has been accepted!")
        .then(() => console.log("Email sent"))
        .catch((err) => console.error("Error sending email:", err));
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = { sendMail, createOrderAndSendMail };

const { io } = require("../index.js");
const {
  Conversation,
  Messages,
  User_Messages,
} = require("./InitializeModels.js");
io.on("connection", (socket) => {
  console.log("A new user joined");
  let conversation_id;
  socket.on("joinConversation", async ({ orderId }) => {
    try {
      const existConversation = await Conversation.findOne({
        where: { order_id: orderId },
      });
      if (existConversation) {
        conversation_id = existConversation.conversation_id;
      } else {
        const newConversation = await Conversation.create({
          order_id: orderId,
        });
        conversation_id = newConversation.conversation_id;
      }
      const loadedMessages = await Messages.findAll({
        where: { conversation_id: conversation_id },
        order: [["sent_at", "ASC"]],
      });
      socket.join(conversation_id);
      if (loadedMessages) {
        socket.emit("loadingMessages", { loadedMessages, conversation_id });
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Messages.create({
        conversation_id: data.conversationId,
        sender_id: data.senderId, // The ID of the user sending the message
        message: data.message,
        status: "not_read",
        // If you have file uploads, you can include that as well
        file_url: data.fileUrl || null,
        sent_at: new Date(), // Set the current time
      });
      io.to(data.conversation_id).emit("recieveMessage", newMessage);
    } catch (e) {
      console.log(e);
    }
  });
  socket.on("saveMessage", async (data) => {
    try {
      const userMessage = await User_Messages.create({
        user_id: data.user_id,
        message_id: data.message_id,
      });
      socket.emit("saved message", userMessage);
    } catch (e) {
      console.log(e);
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

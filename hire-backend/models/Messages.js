module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      message_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primarykey: true,
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Conversation",
          key: "conversation_id",
        },
      },

      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      status: {
        type: DataTypes.ENUM("read", "not_read"),
        allowNull: false,
      },
      sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Messages",
    }
  );
  Messages.associate = (models) => {
    Messages.belongsTo(models.Conversation, {
      foreignKey: "conversation_id",
      constraints: true,
    });
    Messages.belongsTo(models.User, {
      foreignKey: "sender_id",
      constraints: true,
    });
  };
  return Messages;
};

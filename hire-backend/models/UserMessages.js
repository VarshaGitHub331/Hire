module.exports = (sequelize, DataTypes) => {
  const User_Messages = sequelize.define(
    "User_Messages",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      message_id: {
        type: DataTypes.UUID,
        references: {
          model: "Messages",
          key: "message_id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "User_Messages",
    }
  );
  User_Messages.associate = (models) => {
    User_Messages.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    User_Messages.belongsTo(models.Messages, {
      foreignKey: "message_id",
    });
  };
  return User_Messages;
};

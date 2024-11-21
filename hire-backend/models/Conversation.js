module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "Conversation",
    }
  );
  Conversation.associate = (models) => {
    Conversation.belongsTo(models.orders, {
      foreign_key: "order_id",
      constraints: true,
    });
  };
  return Conversation;
};

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "order_id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allow: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: "reviewer_id",
    });
    Review.belongsTo(models.User, {
      foreignKey: "reviewee_id",
    });
    Review.belongsTo(models.orders, {
      foreignKey: "order_id",
    });
  };
  return Review;
};

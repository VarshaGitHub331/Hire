module.exports = (sequelize, DataTypes) => {
  const Freelancer_Category = sequelize.define(
    "Freelancer_Category",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Category",
          key: "category_id",
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Freelancer_Category",
    }
  );
  Freelancer_Category.associate = (models) => {
    Freelancer_Category.belongsTo(models.User, {
      foreign_key: "user_id",
    });
    Freelancer_Category.belongsTo(models.Category, {
      foreign_key: "category_id",
    });
  };
  return Freelancer_Category;
};

module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define(
    "Skills",
    {
      skill_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Assuming skill_id is auto-incrementing
      },
      skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "Skills",
    }
  );

  Skills.associate = (models) => {
    Skills.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
    Skills.belongsToMany(models.Job_Postings, {
      through: "Job_Skills",
      foreignKey: "skill_id",
    });
    Skills.belongsToMany(models.User, {
      through: "User",
      foreignKey: "user_id",
    });
  };

  return Skills;
};

module.exports = (sequelize, DataTypes) => {
  const Freelancer_Skills = sequelize.define(
    "Freelancer_Skills",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      skill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Skills",
          key: "skill_id",
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Freelancer_Skills",
    }
  );
  Freelancer_Skills.associate = (models) => {
    Freelancer_Skills.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Freelancer_Skills.belongsTo(models.Skills, {
      foreignKey: "skill_id",
    });
  };
  return Freelancer_Skills;
};

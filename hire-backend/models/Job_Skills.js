module.exports = (sequelize, DataTypes) => {
  const Job_Skills = sequelize.define(
    "Job_Skills",
    {
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Job_Postings",
          key: "job_id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Skills",
          key: "skill_id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      tableName: "Job_Skills",
    }
  );
  Job_Skills.associate = (models) => {
    Job_Skills.belongsTo(models.Job_Postings, {
      foreignKey: "job_id",
    });
    Job_Skills.belongsTo(models.Skills, {
      foreignKey: "skill_id",
    });
  };
  return Job_Skills;
};

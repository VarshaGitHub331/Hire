module.exports = (sequelize, DataTypes) => {
  const Applicants = sequelize.define(
    "Applicants",
    {
      job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Job_Postings", // Correct spelling of "references"
          key: "job_id",
        },
      },
      applicant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Freelancer",
          key: "user_id",
        },
      },
    },
    {
      tableName: "Applicants",
      timestamps: false, // Disable timestamps (createdAt and updatedAt)
    }
  );

  Applicants.associate = (models) => {
    Applicants.belongsTo(models.Job_Postings, {
      foreignKey: "job_id",
      constraints: true,
    });
    Applicants.belongsTo(models.Freelancer, {
      foreignKey: "applicant_id", // Use the correct foreign key reference here
      constraints: true,
    });
  };

  return Applicants;
};

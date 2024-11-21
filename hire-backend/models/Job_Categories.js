module.exports = (sequelize, DataTypes) => {
  const Job_Categories = sequelize.define(
    "Job_Categories",
    {
      job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Job_Postings",
          key: "job_id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Category",
          key: "category_id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "Job_Categories",
    }
  );
  Job_Categories.associate = (models) => {
    Job_Categories.belongsTo(models.Job_Postings, {
      foreignKey: "job_id",
    });
    Job_Categories.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return Job_Categories;
};

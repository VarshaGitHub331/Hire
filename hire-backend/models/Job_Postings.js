module.exports = (sequelize, DataTypes) => {
  const Job_Postings = sequelize.define(
    "Job_Postings",
    {
      job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // This field can be null
        references: {
          model: "Client", // Assuming there is a 'Users' table
          key: "user_id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true, // This field can be null
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // This field can be null
      },

      budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // This field can be null
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true, // This field can be null
      },
      duration: {
        type: DataTypes.STRING(255),
        allowNull: true, // This field can be null
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW, // Default value is the current timestamp
      },
      status: {
        type: DataTypes.ENUM("True", "False"),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW, // Default value is the current timestamp
      },
    },
    {
      timestamps: true, // Enables automatic tracking of createdAt and updatedAt
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Job_Postings", // Specifies the table name as 'job_postings'
    }
  );

  Job_Postings.associate = (models) => {
    // Association with Users (assuming a user creates the job posting)
    Job_Postings.belongsTo(models.Users, {
      foreignKey: "user_id",
    });
    // Association with Categories (assuming jobs are categorized)
    Job_Postings.belongsToMany(models.Skills, {
      through: "Job_Skills",
      foreignKey: "job_id",
    });
    Job_Postings.belongsToMany(models.Category, {
      through: "Job_Categories",
      foreignKey: "job_id",
    });
    Job_Postings.hasOne(models.Orders, {
      foreignKey: "job_posting_id", // Foreign key in the Orders table
      as: "order", // Optional alias
    });
    Job_Postings.hasMany(models.Bids, {
      foreignKey: "job_posting_id",
      as: "bid",
    });
  };

  return Job_Postings;
};

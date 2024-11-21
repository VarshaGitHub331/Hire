module.exports = (sequelize, DataTypes) => {
  const Freelancer = sequelize.define(
    "Freelancer",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "User", // Table name for the foreign key
          key: "user_id", // Foreign key column in the users table
        },
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Freelancer", // Correct key for table name
    }
  );

  // Defining the association between Freelancer and User
  Freelancer.associate = (models) => {
    Freelancer.belongsTo(models.User, {
      foreignKey: "user_id", // Column in this table that references the users table
    });
  };

  return Freelancer;
};

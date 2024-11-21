module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("freelancer", "company", "admin"),
      },
    },
    {
      // Map Sequelize's `createdAt` and `updatedAt` to your actual table's `created_at` and `updated_at`
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "User", // Specify the table name if it's different
    }
  );

  return User;
};

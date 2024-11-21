module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "User", // Refers to the 'users' table
          key: "user_id",
        },
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_number: {
        // Fixed the typo here
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Sequelize will automatically manage `created_at` and `updated_at`
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "Client", // Ensures Sequelize knows the correct table name
    }
  );

  Client.associate = (models) => {
    Client.belongsTo(models.User, {
      foreignKey: "user_id", // Specifies the foreign key in the association
    });
  };

  return Client;
};

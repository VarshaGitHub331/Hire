module.exports = (sequelize, DataTypes) => {
  const Gigs = sequelize.define(
    "Gigs",
    {
      gig_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Gigs",
    }
  );
  Gigs.associate = (models) => {
    Gigs.belongsToMany(models.Category, {
      through: "Gig_Categories",
      foreign_key: "gig_id",
    });
    Gigs.belongsToMany(models.Skills, {
      through: "Gig_Skills",
      foreign_key: "gig_id",
    });
  };

  return Gigs;
};

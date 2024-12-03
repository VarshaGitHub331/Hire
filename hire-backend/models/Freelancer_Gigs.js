module.exports = (sequelize, DataTypes) => {
  const Freelancer_Gigs = sequelize.define(
    "Freelancer_Gigs",
    {
      gig_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Freelancer_Gigs",
    }
  );
  Freelancer_Gigs.associate = (models) => {
    Freelancer_Gigs.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Freelancer_Gigs.belongsTo(models.Gigs, {
      foreignKey: "gig_id",
    });
  };
  return Freelancer_Gigs;
};

module.exports = (sequelize, DataTypes) => {
  const Gig_Categories = sequelize.define("Gig_Categories", {
    gig_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Gig_Categories.associate = (models) => {
    Gig_Categories.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
    Gig_Categories.belongsTo(models.Gigs, {
      foreignKey: "gig_id",
    });
  };
  return Gig_Categories;
};

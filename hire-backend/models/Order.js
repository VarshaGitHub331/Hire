module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Client",
        key: "user_id",
      },
    },
    acceptor: {
      type: DataTypes.INTEGER,

      references: {
        model: "Freelancer",
        key: "user_id",
      },
    },
    job_posting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Job_Postings", // Reference the Job_Postings table
        key: "job_id", // Reference the primary key in Job_Postings table
      },
    },
    status: {
      type: DataTypes.ENUM("created", "accepted", "progress", "complete"),
      allowNull: false,
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.Client, {
      foreignKey: "creator",
      as: "client",
      constraints: true,
    });
    Order.belongsTo(models.Freelancer, {
      foreignKey: "acceptor",
      as: "acceptor",
      constraints: true,
    });
    Order.belongsTo(models.Job_Postings, {
      foreignKey: "job_posting_id",
      constraints: true,
    });
  };
  return Order;
};

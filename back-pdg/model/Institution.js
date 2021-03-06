const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Institution", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
    field: "institutionId",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

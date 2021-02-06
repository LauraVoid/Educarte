const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Homework", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  skill: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attached: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

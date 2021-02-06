const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Role", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
    field: "roleId",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

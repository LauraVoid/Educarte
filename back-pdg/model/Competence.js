const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Competence", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
    field: "competenceId",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

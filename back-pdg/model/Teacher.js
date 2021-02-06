const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Teacher", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
    field: "teacherId",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idDocument: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
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

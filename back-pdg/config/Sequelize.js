const { Sequelize } = require("sequelize");
const InstitutionModel = require("../model/Institution");
const CourseModel = require("../model/Course");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERN,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }
);

const Institution = InstitutionModel(sequelize, Sequelize);
const Course = CourseModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
  Institution,
  Course,
};

module.exports = (sequelize, type) => {
  const Course = sequelize.define("Course", {
    id: {
      type: type.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
  });

  return Course;
};

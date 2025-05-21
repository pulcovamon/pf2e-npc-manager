import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

sequelize.authenticate().then(() => {
  sequelize.query('PRAGMA foreign_keys = ON;');
});


export default sequelize;

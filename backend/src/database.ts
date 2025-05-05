import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./backend/database.sqlite",
  logging: false,
});

export default sequelize;

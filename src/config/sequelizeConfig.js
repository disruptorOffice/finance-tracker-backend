import { config } from "./../config/envConfig.js";
import { Sequelize } from "sequelize";

export const SequelConfig = {
  HOST: config.db.host,

  USER: config.db.user,

  PASSWORD: config.db.password,

  DB: config.db.database,

  dialect: "mysql",
  port: config.db.port,
};

export const sequelizeConnection = new Sequelize(
  SequelConfig.DB,
  SequelConfig.USER,
  SequelConfig.PASSWORD,
  {
    host: SequelConfig.HOST,

    dialect: SequelConfig.dialect,
    port: SequelConfig.port,
  }
);

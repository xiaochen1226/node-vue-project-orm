import { Sequelize } from "sequelize-typescript";
import config from "./config";

const sequelize = new Sequelize(
  config.MYSQL_DATABASE as string,
  config.MYSQL_USER as string,
  config.MYSQL_PASSWORD,
  {
    host: config.MYSQL_HOST,
    dialect: "mysql",
    port: config.MYSQL_PORT as any,
    timezone: "+08:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }
);

export default sequelize;

import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface UserInstance extends Model {
  id: number;
  name: string;
  nickname: string;
  password: string;
  createAt: string;
  updateAt: string;
  avatar_url: string;
}

const User = sequelize.define<UserInstance>(
  "users",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataType.STRING,
    nickname: DataType.STRING,
    password: DataType.STRING,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
    avatar_url: DataType.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default User;

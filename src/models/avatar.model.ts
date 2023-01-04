import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface AvatarInstance extends Model {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  user_id: number;
  createAt: string;
  updateAt: string;
}

const Avatar = sequelize.define<AvatarInstance>(
  "avatar",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: DataType.STRING,
    mimetype: DataType.STRING,
    size: DataType.INTEGER,
    user_id: DataType.INTEGER,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
  },
  {
    freezeTableName: true,
  }
);

export default Avatar;

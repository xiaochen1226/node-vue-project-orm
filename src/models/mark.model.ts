import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface MarkInstance extends Model {
  id: number;
  product_id: number;
  user_id: number;
  is_mark: number;
  createAt: string;
  updateAt: string;
}

const Mark = sequelize.define<MarkInstance>(
  "mark",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: DataType.INTEGER,
    user_id: DataType.INTEGER,
    is_mark: DataType.INTEGER,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
  },
  {
    freezeTableName: true,
  }
);

export default Mark;

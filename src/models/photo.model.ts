import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface PhotoInstance extends Model {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  product_id: number;
  createAt: string;
  updateAt: string;
}

const Photo = sequelize.define<PhotoInstance>(
  "product_photo",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: DataType.STRING,
    mimetype: DataType.STRING,
    size: DataType.INTEGER,
    product_id: DataType.INTEGER,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
  },
  {
    freezeTableName: true,
  }
);

export default Photo;

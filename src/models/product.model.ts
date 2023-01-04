import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface ProductInstance extends Model {
  id: number;
  name: string;
  merchant_id: number;
  brand_id: number;
  cate_id: number;
  price: number;
  original: number;
  tag: string;
  content: string;
  summary: string;
  photo_url: string;
}

const Product = sequelize.define<ProductInstance>(
  "product",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataType.STRING,
    merchant_id: DataType.INTEGER,
    brand_id: DataType.INTEGER,
    cate_id: DataType.INTEGER,
    price: DataType.INTEGER,
    original: DataType.INTEGER,
    tag: DataType.STRING,
    content: DataType.STRING,
    summary: DataType.STRING,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
    photo_url: DataType.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Product;

import { DataType, Model } from "sequelize-typescript";
import sequelize from "../app/database";

interface CartInstance extends Model {
  id: number;
  product_id: number;
  num: number;
  createAt: string;
  updateAt: string;
  user_id: number;
  is_checked: number;
}

const Cart = sequelize.define<CartInstance>(
  "cart",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: DataType.INTEGER,
    num: DataType.INTEGER,
    createAt: DataType.DATE,
    updateAt: DataType.DATE,
    user_id: DataType.INTEGER,
    is_checked: DataType.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Cart;

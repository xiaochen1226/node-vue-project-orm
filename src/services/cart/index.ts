import sequelize from "../../app/database";
import Cart from "../../models/cart.model";

const productIncrementCart = (id: number, num: number, user_id: number) => {
  return Cart.create({
    product_id: id,
    num,
    user_id,
    is_checked: 0,
  });
};

const getProductIdToProduct = (product_id: number, user_id: number) => {
  return Cart.findAll({
    raw: true,
    where: {
      product_id,
      user_id,
    },
  });
};

const updateProductNum = (id: number, num: number) => {
  return Cart.update(
    {
      num,
    },
    {
      where: {
        id,
      },
    }
  );
};

const updateProductCheck = (id: number, check: number) => {
  return Cart.update(
    {
      is_checked: check,
    },
    {
      where: {
        id,
      },
    }
  );
};

const getCartListOfProduct = (user_id: number) => {
  return Cart.findAll({
    raw: true,
    where: {
      user_id,
    },
  });
};

export default {
  productIncrementCart,
  getProductIdToProduct,
  updateProductNum,
  updateProductCheck,
  getCartListOfProduct,
};

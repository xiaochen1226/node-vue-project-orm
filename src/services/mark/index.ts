import Mark from "../../models/mark.model";

const getProductOfMark = (id: number, userId: number) => {
  return Mark.findAll({
    raw: true,
    where: {
      product_id: id,
      user_id: userId,
    },
  });
};

const createProductToMark = (productId: number, userId: number) => {
  return Mark.create({ product_id: productId, user_id: userId, is_mark: 1 });
};

const updateProductToMark = (id: number, isMark: number) => {
  return Mark.update(
    { is_mark: isMark },
    {
      where: {
        id,
      },
    }
  );
};

export default { getProductOfMark, createProductToMark, updateProductToMark };

import { Op } from "sequelize";
import sequelize from "../../app/database";
import Product from "../../models/product.model";
import { IPagination } from "./type";

const getProductList = (pagination: IPagination, name: string) => {
  const where = {} as any;
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  return Product.findAndCountAll({
    raw: true,
    where,
    ...pagination,
  });
};

const getProductById = (id: number) => {
  return Product.findAll({
    raw: true,
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT name FROM merchant AS m WHERE m.id = product.merchant_id)`
          ),
          "merchantName",
        ],
        [
          sequelize.literal(
            `(SELECT name FROM brand AS b WHERE b.id = product.brand_id)`
          ),
          "brand",
        ],
        [
          sequelize.literal(
            `(SELECT name FROM cate AS c WHERE c.id = product.cate_id )`
          ),
          "cate",
        ],
      ],
    },
    where: {
      id,
    },
  });
};

export default {
  getProductList,
  getProductById,
};

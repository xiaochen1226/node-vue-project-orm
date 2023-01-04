import Router from "koa-router";
import { verifyAuth } from "../middleware/user";
import productController from "../controllers/product";

const productRouter = new Router({ prefix: "/product" });

productRouter.get("/", productController.getProduct);
productRouter.get("/:id", verifyAuth, productController.getProductInfo);
productRouter.post(
  "/:productId/mark",
  verifyAuth,
  productController.productToMark
);

export default productRouter;

import Router from "koa-router";
import { verifyAuth } from "../middleware/user/index";
import cartController from "../controllers/cart";

const cartRouter = new Router({ prefix: "/cart" });

cartRouter.post("/:productId", verifyAuth, cartController.increment);
cartRouter.patch("/:id", verifyAuth, cartController.update);
cartRouter.get("/", verifyAuth, cartController.list);

export default cartRouter;

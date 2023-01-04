import type Koa from "koa";
import { ICartQuery } from "./type";
import cartService from "../../services/cart";
import productService from "../../services/product";

class CartController {
  async increment(ctx: Koa.Context) {
    const { productId } = ctx.params;
    const { id: userId } = ctx.user;

    try {
      const result = await cartService.getProductIdToProduct(productId, userId);
      console.log(result);

      if (result.length) {
        const { id, num } = result[0];
        await cartService.updateProductNum(id, num + 1);
      } else {
        await cartService.productIncrementCart(productId, 1, userId);
      }

      ctx.body = {
        status: 200,
        msg: "添加成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }

  async update(ctx: Koa.Context) {
    const { id } = ctx.params;
    const { num, check } = ctx.request.body as ICartQuery;

    try {
      if (num) {
        await cartService.updateProductNum(id, num);
      } else {
        await cartService.updateProductCheck(id, check as number);
      }

      ctx.body = {
        status: 200,
        msg: "修改成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }

  async list(ctx: Koa.Context) {
    const { id: userId } = ctx.user;

    try {
      const result = (await cartService.getCartListOfProduct(userId)) as any;
      console.log(result);

      for (const item of result) {
        const [product] = await productService.getProductById(item.product_id);
        item.product = product;
      }

      ctx.body = {
        data: result,
        status: 200,
        msg: "查询成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }
}

export default new CartController();

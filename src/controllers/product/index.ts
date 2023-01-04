import type Koa from "koa";
import productService from "../../services/product";
import photoService from "../../services/photo";
import markService from "../../services/mark";
import config from "../../app/config";

class ProductController {
  async getProduct(ctx: Koa.Context) {
    const { offset, limit, name } = ctx.query;
    const pagination = {
      offset: Number(offset),
      limit: Number(limit),
    };

    try {
      const result = await productService.getProductList(
        pagination,
        name as unknown as string
      );
      const { count, rows } = result;

      ctx.body = {
        data: rows,
        total: count,
        status: 200,
        msg: "获取成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }

  async getProductInfo(ctx: Koa.Context) {
    const { id } = ctx.params;
    let mark = "" as any;
    try {
      const product = await productService.getProductById(id);
      const photoList = await photoService.getPhotoList(id);
      if (ctx.user) {
        const markData = await markService.getProductOfMark(id, ctx.user.id);
        if (markData.length) {
          mark = markData[0].is_mark;
        } else {
          mark = 0;
        }
      }

      const photoUrlList = photoList.reduce((pre: any, current: any): any => {
        const url = `${config.APP_HOST}:8099/product/picture/${current.filename}`;
        pre.push(url);

        return pre;
      }, []);

      ctx.body = {
        data: [{ ...product[0], photoUrl: photoUrlList, is_mark: mark }],
        status: 200,
        msg: "获取成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async productToMark(ctx: Koa.Context) {
    const { productId } = ctx.params;
    let msg = "";
    const markData = await markService.getProductOfMark(productId, ctx.user.id);
    if (markData.length) {
      const isMark = markData[0].is_mark ? 0 : 1;
      await markService.updateProductToMark(markData[0].id, isMark);
      msg = isMark ? "收藏成功" : "取消收藏";
    } else {
      await markService.createProductToMark(productId, ctx.user.id);
      msg = "收藏成功";
    }

    ctx.body = {
      status: 200,
      msg,
    };
  }
}

export default new ProductController();

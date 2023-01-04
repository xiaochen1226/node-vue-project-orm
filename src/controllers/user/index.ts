import type Koa from "koa";
import jwt from "jsonwebtoken";
import userService from "../../services/user";
import config, { PRIVATE_KEY } from "../../app/config";
import { IRegisterUser } from "./type";
import fs from "fs";
import { AVATAR_PATH } from "../../constants/file-path";

class UserController {
  async getUser(ctx: Koa.Context) {
    const user = ctx.request.body as IRegisterUser;
    console.log(user);

    try {
      await userService.registerUser(user);

      ctx.body = {
        status: 200,
        msg: "注册成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }

  async login(ctx: Koa.Context) {
    const { id, name, nickname, avatar_url } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: "RS256",
    });

    ctx.body = {
      data: { id, name, nickname, token, avatar_url },
      status: 200,
      msg: "登录成功",
    };
  }

  async saveAvatarInfo(ctx: any) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    try {
      await userService.uploadAvatar(filename, mimetype, size, id);
      const avatar = `${config.APP_HOST}:${config.APP_PORT}/user/${id}/avatar`;
      await userService.updateAvatarUrlById(avatar, id);

      ctx.body = {
        data: {
          avatar_url: avatar,
        },
        status: 200,
        msg: "上传头像成功",
      };
    } catch (error) {
      return ctx.app.emit("error", error, ctx);
    }
  }

  async avatarInfo(ctx: Koa.Context) {
    const { userId } = ctx.params;
    const [avatarInfo] = await userService.getAvatarByUserId(userId);

    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

export default new UserController();

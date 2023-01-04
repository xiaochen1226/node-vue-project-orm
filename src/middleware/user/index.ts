import type Koa from "koa";
import jwt from "jsonwebtoken";
import { INameAndPassword } from "./type";
import errorTypes from "../../constants/user";
import userService from "../../services/user";
import md5password from "../../utils/md5password";
import { PUBLIC_KEY } from "../../app/config";
import Multer from "koa-multer";
import { AVATAR_PATH } from "../../constants/file-path";

const verifyUser = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const { name, password } = ctx.request.body as INameAndPassword;

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await userService.getUserByName(name);

  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassword = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const { password } = ctx.request.body as INameAndPassword;
  (ctx.request.body as INameAndPassword).password = md5password(password);

  await next();
};

const verifyLogin = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const { name, password } = ctx.request.body as INameAndPassword;

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await userService.getUserByName(name);
  const user = result[0];

  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_NOT_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx: Koa.Context, next: () => Promise<any>) => {
  let authorization = ctx.cookies.get("token");

  if (ctx.headers.authorization) {
    authorization = ctx.headers.authorization;
  }
  //   const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.user = result;

    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};

const avatarUpload = Multer({
  dest: AVATAR_PATH,
});

const avatarHandler = avatarUpload.single("avatar");

export { verifyUser, handlePassword, verifyLogin, verifyAuth, avatarHandler };

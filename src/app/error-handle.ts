import errorTypes from "../constants/user";

export default function (error: any, ctx: any) {
  let status, msg;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      msg = "用户名或密码不能为空";
      break;

    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      msg = "用户名已存在";
      break;

    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      msg = "用户名不存在";
      break;

    case errorTypes.PASSWORD_IS_NOT_INCORRECT:
      status = 400;
      msg = "密码不正确";
      break;

    case errorTypes.UNAUTHORIZATION:
      status = 401;
      msg = "无效token";
      break;

    default:
      status = 500;
      msg = error;
      break;
  }

  ctx.status = status;
  ctx.body = {
    status,
    msg,
  };
}

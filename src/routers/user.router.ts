import Router from "koa-router";
import {
  verifyUser,
  handlePassword,
  verifyLogin,
  verifyAuth,
  avatarHandler,
} from "../middleware/user";
import userController from "../controllers/user";

const userRouter = new Router({ prefix: "/user" });

userRouter.post(
  "/register",
  verifyUser,
  handlePassword,
  userController.getUser
);
userRouter.post("/login", verifyLogin, userController.login);
userRouter.post(
  "/avatar",
  verifyAuth,
  avatarHandler,
  userController.saveAvatarInfo
);
userRouter.get("/:userId/avatar", userController.avatarInfo);
userRouter.get("/test", verifyAuth, (ctx: any, next: any) => {
  ctx.body = {
    status: 200,
    msg: "授权成功",
  };
});

export default userRouter;

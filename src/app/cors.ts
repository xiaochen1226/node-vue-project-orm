import type Koa from 'koa'
import cors from "koa2-cors";

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
    app.use(
        cors({
          origin: (ctx: any) => {
            if (ctx.url === "/test") {
              return "*";
            }
            return "http:localhost:8000"; // 允许http:localhost:8000请求跨域
          },
          maxAge: 5,
          credentials: true,
          allowMethods: ["GET", "POST", "PUT", "DELETE"],
          allowHeaders: ["Content-Type", "Authorization", "Accept"],
          exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
        })
      )
}
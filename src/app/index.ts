import Koa from "koa";
import statics from "koa-static";
import bodyParser from "koa-bodyparser";
import Logger from "koa-logger";
import moment from "moment";
import path from "path";
import useRouter from "../routers/index";
import cors from "./cors";
import errorHandle from "./error-handle";

const staticPath = "./static";
const logger = Logger((str: string) => {
  console.log(moment().format("YYYY-MM-DD HH:mm:ss") + str);
});

const app = new Koa();

app.use(bodyParser());
app.use(logger);
app.use(statics(path.join(__dirname, staticPath)));
useRouter(app);
cors(app);
app.on("error", errorHandle);

export default app;

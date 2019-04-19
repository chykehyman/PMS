import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import mongodbConfig from "./config";
import routes from "./routes/index";
import apiResponse from "./helpers/apiResponse";

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || "development";
const port = env === "test" ? 7777 : parseInt(process.env.PORT, 10) || 7778;

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodbConfig(env);

app.get("/api/v1", (_, response) =>
  apiResponse.success(
    response,
    200,
    "Welcome to the Population Management System API"
  )
);

app.use("/api/v1", routes);

app.all("*", (_, response) =>
  apiResponse.error(
    response,
    404,
    "API route does not exist. Redirect to /api/v1"
  )
);

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;

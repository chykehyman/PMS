import mongoose from "mongoose";
import config from "./dbConfig";

export default env => {
  mongoose.Promise = global.Promise;

  const dbConfig = config[env];
  const dbOptions = { useNewUrlParser: true, useCreateIndex: true };

  const connectMongodb = (url, options) => {
    mongoose.connect(url, options);
  };

  if (dbConfig.use_prod_env) {
    connectMongodb(process.env[dbConfig.use_prod_env], dbOptions);
  } else {
    const { prefix, host, port, database } = dbConfig;
    const url = `${prefix}://${host}:${port}/${database}`;

    connectMongodb(url, dbOptions);
  }

  const db = mongoose.connection;
  db.once("open", () => {
    console.info({ message: "Connected to the database" });
  });

  db.on("error", () => console.error({ message: "MongoDB connection error:" }));
};

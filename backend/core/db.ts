import mongoose from "mongoose";

const url = "mongodb://localhost:27017/slackclone";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("-----> mongoDB connected..."))
  .catch((err) =>
    console.log("-----> Error trying to connect to mongoDB: ", err)
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

export { db, mongoose };

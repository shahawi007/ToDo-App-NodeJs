const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const dotenv = require("dotenv");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
dotenv.config({ path: "config.env" });
const mongoose = require("mongoose");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const DB = process.env.DATABASE.replace(
  /<password>/gi,
  process.env.DATABASE_PASSWORD
);

// console.log(process.env.DATABASE_PASSWORD); // Check the value after replacement

// connect to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`working on port ${port}`);
});

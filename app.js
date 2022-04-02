const express = require("express");
const port = 5005;
const app = express();
const tasks = require("./routers/tasks");
const connectDB = require("./db/conecnt");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/tasks/", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is ruining on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
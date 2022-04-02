const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

// .then(() => console.log("CONNECTED TO  DB..."))
// .catch((error) => console.log(error, "SOMTHING WENT WRONG"));

module.exports = connectDB;

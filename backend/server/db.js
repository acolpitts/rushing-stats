const mongoose = require("mongoose");

const MONGODBURI =
  process.env.MONGODBURI || "mongodb://localhost/rushing-stats";

const connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      if (process.env.NODE_ENV !== "test")
        console.log(`💾 Connected to ${MONGODBURI}`);
    })
    .on("error", (error) => {
      console.warn("Error : ", error);
    });
};

module.exports = {
  URI: MONGODBURI,
  connect,
};

/**
 * Seed rushing.json data
 */
const mongoose = require("mongoose");
const { resolve } = require("path");
require("dotenv").config({ path: resolve("../.env") });

const Player = require("../server/models/player.model");

// connect mongoose
const MONGODBURI =
  process.env.MONGODBURI || "mongodb://localhost/rushing-stats";

mongoose.Promise = global.Promise;
mongoose.connect(MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log(`💾 Connected to ${MONGODBURI}`);
    // drop existing collection
    mongoose.connection.collections.players.drop(() => {
      // seed new data
      seedPlayers();
    });
  })
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

function seedPlayers() {
  //load/init seed data
  const data = require("../data/rushing.json");
  const seeds = [];
  for (let i = 0; i < data.length; ++i) {
    seeds.push(new Player(data[i]));
  }

  //write seed data to mongo
  seeds.map(async (s, index) => {
    await s.save((err, result) => {
      if (index === seeds.length - 1) {
        console.log(
          `✨ Database successfully seeded with ${seeds.length} records!`
        );
        mongoose.disconnect();
      }
    });
  });
}

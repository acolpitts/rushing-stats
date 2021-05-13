const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  Player: {
    type: String,
    required: true,
  },
  Team: {
    type: String,
    required: true,
  },
  Pos: String,
  Att: Number,
  "Att/G": Number,
  Yds: Number,
  Avg: Number,
  "Yds/G": Number,
  TD: Number,
  "1st": Number,
  "20+": Number,
  "40+": Number,
  FUM: Number,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;

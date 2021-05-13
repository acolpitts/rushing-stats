const router = require("express").Router();
const Player = require("../models/player.model");

const BASE_URL = "/api/v1/football";

router.get(BASE_URL, async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const options = {
    skip: parseInt(skip), // Starting Row
    limit: parseInt(limit), // Ending Row
    sort: { Yds: -1 }, // default sort by Yard DESC
  };
  Player.find(
    {},
    ["Player", "Team", "Yds", "Yds/G", "TD"], // Columns to Return
    options
  )
    .then((data) => {
      res.json({ status: "success", data });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get(BASE_URL + "/:id", async (req, res) => {
  try {
    // const course = await queries.getSingleCourse(ctx.params.id);
    // if (course.length) {
    //   ctx.body = {
    //     status: "success",
    //     data: course,
    //   };
    // } else {
    //   ctx.status = 404;
    //   ctx.body = {
    //     status: "error",
    //     message: "That course does not exist.",
    //   };
    // }
    res.json({ status: "success", message: "coming soon" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

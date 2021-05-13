// setup tests
require("../test-helper")();

// include data models
const Player = require("../../server/models/player.model");

describe("routes : football", () => {
  describe("GET /api/v1/football", () => {
    // seed three players
    beforeEach((done) => {
      const players = [
        {
          Player: "Joe Banyard",
          Team: "JAX",
          Pos: "RB",
          Att: 2,
          "Att/G": 2,
          Yds: 7,
          Avg: 3.5,
          "Yds/G": 7,
          TD: 0,
          Lng: "7",
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          FUM: 0,
        },
        {
          Player: "Shaun Hill",
          Team: "MIN",
          Pos: "QB",
          Att: 5,
          "Att/G": 1.7,
          Yds: 5,
          Avg: 1,
          "Yds/G": 1.7,
          TD: 0,
          Lng: "9",
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          FUM: 0,
        },
        {
          Player: "Breshad Perriman",
          Team: "BAL",
          Pos: "WR",
          Att: 1,
          "Att/G": 0.1,
          Yds: 2,
          Avg: 2,
          "Yds/G": 0.1,
          TD: 0,
          Lng: "2",
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          FUM: 0,
        },
      ];
      Player.collection.drop();
      Player.insertMany(players).then(function (docs) {
        done();
      });
    });

    it("should return all rushing stats", (done) => {
      chai
        .request(server)
        .get("/api/v1/football")
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql("success");
          // the JSON response body should have a
          // key-value pair of {"data": [3 player objects]}
          res.body.data.length.should.eql(3);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            "_id",
            "Player",
            "Team",
            "Yds",
            "Yds/G",
            "TD"
          );
          done();
        });
    });
  });
});

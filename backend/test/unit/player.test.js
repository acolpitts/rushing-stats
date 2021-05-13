//inside create_test.js
const assert = require("assert");
const { expect } = require("chai");
const Player = require("../../server/models/player.model"); //imports the Player model.

describe("models : player", () => {
  describe("when creating a new model", () => {
    it("should create a new player given valid props", (done) => {
      const p = new Player({ Player: "Joe Banyard", Team: "JAX" });
      p.save() //takes some time and returns a promise
        .then(() => {
          assert(!p.isNew); //if player is saved to db it is not new
          done();
        });
    });

    it("should throw an error given invalid props", (done) => {
      // Player name is required,
      const invalidPlayer = new Player({ Team: "JAX" });
      invalidPlayer.save().catch((err) => {
        // test that an error was thrown
        should.exist(err);
        expect(err._message).to.eq("Player validation failed");
        done();
      });
    });
  });

  describe("when reading models", () => {
    beforeEach(() => {
      player = new Player({ Player: "Joe Banyard", Team: "JAX" });
      player.save().then(() => done());
    });

    it("should find player with the name of Joe Banyard", (done) => {
      Player.findOne({ Player: "Joe Banyard" }).then((p) => {
        assert(p.Player === "Joe Banyard");
        done();
      });
    });
  });
});

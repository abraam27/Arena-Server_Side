const express = require("express");
const router = express.Router();
const PlayerController = require("../Controllers/PlayerController");
const GameController = require("../Controllers/GameController");
const FieldController = require("../Controllers/FieldController");


// get all Players
router.get("/",PlayerController.GetAllPlayers)
// get Player by id
router.get("/:id",PlayerController.GetPlayerByID);
// add new Player
router.post("/add",PlayerController.AddNewPlayer);
// update Player by id
router.put("/update",PlayerController.UpdatePlayer);
// delete Player by id
router.delete("/delete/:id",PlayerController.DeletePlayer);
// get the uaser his all reservations
router.get("/games/:id",PlayerController.GetAllGamesByPlayerID);
// get the uaser his all reservations
router.get("/games/next/:id",PlayerController.GetAllNextGamesByPlayerID);
// get the uaser his all reservations
router.get("/games/previous/:id",PlayerController.GetAllPreviousGamesByPlayerID);

module.exports = router;
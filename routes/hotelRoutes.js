const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const roomController = require("../controllers/roomController");

// Hotel routes
router.get("/", hotelController.getAllHotels);
router.post("/", hotelController.createHotel);
router.get("/:slug", hotelController.getHotel);
router.put("/:slug", hotelController.updateHotel);
router.delete("/:slug", hotelController.deleteHotel);

// Room routes
router.post("/:hotel_slug/room", roomController.createRoom);
router.get("/:hotel_slug/room/:room_slug", roomController.getRoom);
router.put("/:hotel_slug/room/:room_slug", roomController.updateRoom);
router.delete("/:hotel_slug/room/:room_slug", roomController.deleteRoom);

module.exports = router;

import express from "express";
import { createRoom, updateRoom, deleteRoom, getAllRoom, getRoom, updateRoomAvailability, cancelRoomReservation } from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/:hotelId",verifyAdmin ,createRoom);

//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability );
router.put("/availability/:id/cancel", cancelRoomReservation);
//DELETE
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom);

//GET
router.get("/:id",getRoom);

//GET ALL
router.get("/",getAllRoom);

export default router;
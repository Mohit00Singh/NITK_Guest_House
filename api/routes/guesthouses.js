import express from "express";
import {createGH,updatedGH,deleteGH,getAllGH,getGH,
    countByCity,countByType, getGHRooms, getGHByAminity, 
    getGHNames} from "../controllers/guesthouses.js"
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();


//CREATE
router.post("/" , verifyAdmin, createGH);

// //UPDATE
 router.put("/:id", verifyAdmin, updatedGH);

// //DELETE
 router.delete("/:id", verifyAdmin, deleteGH);

//GET
router.get("/find/:id",getGH);

//GET ALL
router.get("/",getAllGH);

//GET ALL
router.get("/countByCity",countByCity);
router.get("/byAminity", getGHByAminity);
//GET ALL
router.get("/countByType",countByType);

//GET ROOMS /room/hotelid
router.get("/room/:id",getGHRooms);
router.get('/guesthouses', getGHNames);
export default router;
import Room from "../models/Room.js";
import GuestHouse from "../models/GuestHouse.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const guesthouseId = req.params.hotelId;
  if (!guesthouseId) {
    return res.status(400).json({ success: false, message: "Invalid guesthouseId" });
  }
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await GuestHouse.findByIdAndUpdate(guesthouseId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updates");
  } catch (err) {
    next(err);
  }
};

export const cancelRoomReservation = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $pull: {
          "roomNumbers.$.unavailableDates": { $in: req.body.dates },
        },
      }
    );
    res.status(200).json("Reservation has been cancelled");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const guesthouseId = req.params.hotelId;
  try {
    // Find the room and delete it by ID
    await Room.findByIdAndDelete(req.params.id);

    // Update the GuestHouse to remove the reference to the deleted room
    await GuestHouse.findByIdAndUpdate(
      guesthouseId,
      {
        $pull: { rooms: req.params.id },
      },
      { new: true }
    );

    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    console.log("ROOM:::::::::",room)
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
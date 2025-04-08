import GuestHouse from "../models/GuestHouse.js";
import Room from "../models/Room.js";


//Creating New GuestHouse
export const createGH = async (req, res, next) => {
    const newGH = new GuestHouse(req.body);
    try{
        const savedGH = await newGH.save();
        res.status(200).json(savedGH);
    } catch(err) {
        next(err);
    }
};

//Updating GuestHouse INFO

export const updatedGH = async (req, res, next) => {
    try{
        const updatedGH = await GuestHouse.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true} // update side by side
        );
        res.status(200).json(updatedGH);
    } catch(err) {
        next(err);
    }
};

//Get info of any one GuestHouse by name
export const getGHNames = async (req, res, next) => {
    try{
        const guesthouses = await GuestHouse.find({},'name');
        console.log("GESTHOSES::::",guesthouses)
        res.status(200).json(guesthouses);
    } catch(err) {
        next(err);
    }
};

//To Delete any Guest House

export const deleteGH = async (req, res, next) => {
    try{
        await GuestHouse.findByIdAndDelete(req.params.id);
        res.status(200).json("GuestHouse has been deleted!");
    } catch(err) {
        next(err);
    }
};


//To get INFO about a guesthouse

export const getGH = async (req, res, next) => {
    try{
        const guesthouse = await GuestHouse.findById(req.params.id);
        res.status(200).json(guesthouse);
    } catch(err) {
        next(err);
    }
};

//To get INFO about all GuestHouses

export const getAllGH = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try{
       const guesthouses = await GuestHouse.find({
        ...others,
        cheapestPrice: { $gt: min || 0, $lt: max || 999}
       }).limit(req.query.limit);
        res.status(200).json(guesthouses);
    } catch(err) {
        next(err);
    }
};

//Find GH by city

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return GuestHouse.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

export const getGHByAminity = async (req, res, next) => {
    const aminity = req.query.aminity;
  
    try {
      const guesthouses = await GuestHouse.find({ aminities: { $regex: aminity, $options: "i" } });
      res.status(200).json(guesthouses);
    } catch (err) {
      next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
      const generalCount = await GuestHouse.countDocuments({ type: "general" });
      const vipCount = await GuestHouse.countDocuments({ type: "vip" });
      res.status(200).json([
        { type: "general", count: generalCount },
        { type: "vip", count: vipCount },
      ]);
    } catch (err) {
      next(err);
    }
};

export const getGHRooms=async(req,res,next)=>{
    try{
      const guesthouse = await GuestHouse.findById(req.params.id);
      const list = await Promise.all(guesthouse.rooms.map(room => {
        return Room.findById(room);
      }))
      res.status(200).json(list);
    }
    catch(err){
      next(err);
    }
};
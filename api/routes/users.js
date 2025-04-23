import express from "express";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";
import {updateUser, deleteUser, getAllUser, getUser} from "../controllers/user.js";
const router = express.Router();

 router.get("/checkauthentication",verifyToken,(req,res,next)=>{
     res.send("hello user u r logged in ");
} )

 router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
     res.send("logged in and can delete ");
 } )

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("u r admin loggedin and can delete ");
 } )


//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getAllUser);


// router.put('/:userId/make-admin', makeAdmin );
// router.put('/:userId/remove-admin', removeAdmin );

export default router;
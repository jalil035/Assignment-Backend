import express from "express";
const router = express.Router();
import * as userControllers from "../app/Controllers/userController.js";
import authMiddleWare from "../app/MiddleWares/authMiddleWare.js";


//Users Controllers----------------------------------------------------------------

// User Registration
router.post("/registration", userControllers.registration);

//User Login
router.post("/Login", userControllers.Login);

//User Profile Read
router.get("/profileDetails", authMiddleWare, userControllers.profileDetails);

//All Users Read
router.get("/allUser", authMiddleWare, userControllers.allUser)

//User Profile Update
router.post("/profileUpdate", authMiddleWare, userControllers.profileUpdate);

//Delete Item
router.delete("/deleteSingleUser",authMiddleWare, userControllers.deleteSingleUser);

// //Middelware
// router.get("/profile", authMiddleWare, taskControllers.profile);

// //Cookies
// router.get("/CreateCookie", taskControllers.CreateCookie);



export default router;

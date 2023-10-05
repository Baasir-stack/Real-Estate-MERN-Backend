const express = require("express");
const userController = require("../controller/userController"); // Use require for importing controller functions

const router = express.Router();

// Destructure controller functions
const { bookVisit,getUserInfo, cancelBooking, createUser, getAllBookings, toFav, allFav } =
  userController;

const jwtCheck = require("../config/auth0Config")
const userAuth = require('../middleware/requireAuth')

// Create user

// router.use(userAuth,jwtCheck)

router.post("/register",createUser);

// Get all bookings
router.post("/allBookings", getAllBookings);

//get user info
router.post('/getUser',getUserInfo)

// Book visit
router.post("/bookVisit/:id",bookVisit);


// Remove booking
router.post("/removeBooking/:id", cancelBooking);

// fav residencies
router.post("/fav/:rid", toFav);

//get all fav
router.post("/allFav",userAuth,jwtCheck, allFav);

module.exports = router; // Export the router as userRoute

const asyncHandler = require("express-async-handler");

const prisma = require("../config/prismaConfig");

//@desc Create User
//@route POST /api/register
const createUser = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    
    
    //check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    //if not then create
    if (!userExists) {
      const user = await prisma.user.create({ data: {email} });
      console.log('usernotexist')
      return res.status(200).json(user);
    } else {
      res.status(201).send({ message: "User already registered" });
    }
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
});

const getUserInfo = asyncHandler(async (req, res)=>{
  const {email} = req.body
  const user = await prisma.user.findUnique({
    where: { email },
  });

  res
  .status(200)
  .json({ message: "success", user });


})

//@desc Book Visit
//@route POST /api/bookVisit/:id
const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;


  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    //check if residency is booked by u already or not
    if (
      alreadyBooked.bookedVisits.find((visit) => visit.id === id) &&
      alreadyBooked.bookedVisits.find((visit) => visit.date === date)
    ) {
      res.status(200);
      throw new Error("This residency is already booked by you");
    } else {
      const user = await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res
        .status(200)
        .json({ message: "your visit is booked successfully", user });
    }
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
});

//@desc get all bookings of a user
//@route GET /api/allBookings
const getAllBookings = asyncHandler(async (req, res) => {

  const {email} =req.body
//  let email = "baasir121121@gmail.com"
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select:{bookedVisits:true}
    });
    res.status(200).json(bookings);
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
});


//@desc Cancel Booking
//@route POST /api/removeBooking/:id
const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = existingUser.bookedVisits.findIndex(
      (visit) => visit.id === id
    );

    if (index === -1) {
      res.status(404);
      throw new Error("Booking not found");
    } else {
      existingUser.bookedVisits.splice(index, 1);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: existingUser.bookedVisits,
        },
      });

      res
        .status(200)
        .json({ message: "Booking cancelled successfully", user: updatedUser });
    }
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
});

const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidencies.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidencies: {
            set: user.favResidencies.filter((id) => id !== rid),
          },
        },
      });

      res
        .status(200)
        .json({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidencies: {
            push: rid,
          },
        },
      });
      res.status(200).json({ message: "Updated favorites"});
    }
  } catch (error) {
    return res.json({ error: error.message, stackTrace: error.stack });
  }
});

 const allFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidencies: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  toFav,
  allFav,
  getUserInfo
};

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {validateMiddleware, authMiddleware} = require('../middlewares');

const {validateUser} = validateMiddleware;
const {validateToken} = authMiddleware;

router.post('/register', validateUser, userController.register);
router.post('/login', validateUser, userController.login);
router.get('/trains/availability', userController.checkAvailability);

router.post('/bookings', validateToken, userController.bookSeat);
router.get('/bookings', validateToken, userController.getUserBookings);
router.get('/bookings/:id', validateToken, userController.getBookingDetails);
router.delete('/bookings/:id', validateToken, userController.cancelBooking);

module.exports = router;


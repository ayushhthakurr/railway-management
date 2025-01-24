const {UserService,BookingService} = require('../services');

exports.register = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await UserService.loginUser(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const trains = await BookingService.checkTrainAvailability(source, destination);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookSeat = async (req, res) => {
  try {
    const { trainId, numSeats, userId } = req.body;
    const booking = await BookingService.createBooking(userId, trainId, numSeats);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { userId } = req.body;
    const booking = await BookingService.getBookingDetails(bookingId, userId);
    res.json(booking);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await BookingService.getUserBookings(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { userId } = req.body;
    const result = await BookingService.cancelBooking(bookingId, userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
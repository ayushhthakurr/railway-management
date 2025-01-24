const {BookingRepository,TrainRepository} = require('../repositories');
const sequelize = require('../config/database');

class BookingService {
  async checkTrainAvailability(source, destination) {
    try {
      const availableTrains = await TrainRepository.findBySourceAndDestination(source, destination);

      if (!availableTrains || availableTrains.length === 0) {
        throw new Error('No trains available for this route');
      }

      return availableTrains.filter(train => train.availableSeats > 0).map(train => ({
        id: train.id,
        source: train.source,
        destination: train.destination,
        availableSeats: train.availableSeats
      }));

    } catch (error) {
      throw error;
    }
  }
  async createBooking(userId, trainId, numSeats) {
    const transaction = await sequelize.transaction();

    try {
      const train = await TrainRepository.findByIdWithLock(trainId, transaction);

      if (!train) {
        throw new Error('Train not found');
      }

      if (train.availableSeats < numSeats) {
        throw new Error('Not enough seats available');
      }

      await TrainRepository.updateSeats(
        trainId,
        train.availableSeats - numSeats,
        transaction
      );

      const booking = await BookingRepository.create({
        userId,
        trainId,
        numSeats,
        status: 'confirmed',
        bookingDate: new Date()
      }, transaction);


      await transaction.commit();
      return booking;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getBookingDetails(bookingId, userId) {
    const booking = await BookingRepository.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }


    if (booking.userId !== userId) {
      throw new Error('Unauthorized access to booking');
    }

    return booking;
  }

  async getUserBookings(userId) {
    return await BookingRepository.findByUserId(userId);
  }

  async cancelBooking(bookingId, userId) {
    const transaction = await sequelize.transaction();

    try {
      const booking = await BookingRepository.findById(bookingId);

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.userId !== userId) {
        throw new Error('Unauthorized access to booking');
      }

      const train = await TrainRepository.findByIdWithLock(
        booking.trainId,
        transaction
      );


      await TrainRepository.updateSeats(
        booking.trainId,
        train.availableSeats + booking.numSeats,
        transaction
      );

      await BookingRepository.updateStatus(
        bookingId,
        'cancelled',
        transaction
      );

      await transaction.commit();
      return { message: 'Booking cancelled successfully' };

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new BookingService();


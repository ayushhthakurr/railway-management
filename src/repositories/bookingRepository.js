const {Booking} = require('../models');

class BookingRepository {

  async findBySourceAndDestination(source, destination) {
  return await Train.findAll({
    where: {
      source: source,
      destination: destination
    }
  });
}
  async create(bookingData, transaction) {
    return await Booking.create(bookingData, { transaction });
  }

  async findById(id) {
    return await Booking.findByPk(id, {
      include: ['train', 'user']
    });
  }

  async findByUserId(userId) {
    return await Booking.findAll({
      where: { userId },
      include: ['train']
    });
  }

  async updateStatus(id, status, transaction) {
    return await Booking.update(
      { status },
      { 
        where: { id },
        transaction
      }
    );
  }
}

module.exports = new BookingRepository();
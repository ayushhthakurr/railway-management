const {Train} = require('../models');

class TrainRepository {
  async create(trainData) {
    return await Train.create(trainData);
  }
  async updateSeats(trainId, seats) {
    const result =  await Train.update(seats, {
      where: {
        id: trainId
      }
    });

    return result;
  }

  async updateSeatsBooking(trainId, seats, transaction) {
    const result =  await Train.update(seats, {
      where: {
        id: trainId,
      },
      transaction: transaction
    });

    return result;
  }

  async findByIdWithLock(trainId, transaction) {
    return await Train.findByPk(trainId, {
      lock: true,
      transaction
    });
  }
}

module.exports = new TrainRepository();
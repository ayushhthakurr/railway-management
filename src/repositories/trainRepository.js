const {Train} = require('../models');

class TrainRepository {
  async create(trainData) {
    return await Train.create(trainData);
  }

  async updateSeats(trainId, seats) {
    const newData = {
      totalSeats: seats,
      availableSeats: seats
    }
    const result =  await Train.update(newData, {
      where: {
        id: trainId
      }
    });

    return result;
  }
}

module.exports = new TrainRepository();
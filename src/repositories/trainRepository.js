const {Train} = require('../models');

class TrainRepository {
  async create(trainData) {
    return await Train.create(trainData);
  }

  async updateSeats(trainId, seats) {
    return await Train.update({ seats }, { where: { id: trainId } });
  }
}

module.exports = new TrainRepository();
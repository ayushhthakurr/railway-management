const {TrainRepository} = require('../repositories');

class TrainService {
  async createTrain(trainData) {
    return await TrainRepository.create(trainData);
  }

  async updateTrainSeats(trainId, seats) {
    return await TrainRepository.updateSeats(trainId, seats);
  }
}

module.exports = new TrainService();
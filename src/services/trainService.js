const {TrainRepository} = require('../repositories');

class TrainService {
  async createTrain(trainData) {
    return await TrainRepository.create(trainData);
  }

  async updateTrainSeats(trainId, seats) {
    return await TrainRepository.updateSeats(trainId, {totalSeats: seats, availableSeats: seats});
  }
}

module.exports = new TrainService();
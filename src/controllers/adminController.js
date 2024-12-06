const {TrainService} = require('../services');

exports.addTrain = async (req, res) => {
  try {
    const train = await TrainService.createTrain(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSeats = async (req, res) => {
  try {
    const train = await TrainService.updateTrainSeats(req.params.id, req.body.seats);
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
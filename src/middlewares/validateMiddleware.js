validateUser = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    next();
  };

  validateTrain = (req, res, next) => {
    const { source, destination, totalSeats } = req.body;
    if (!source || !destination || !totalSeats) {
      return res.status(400).json({ error: 'Missing required train details' });
    }
    next();
  };

module.exports = {
  validateTrain,validateUser
}


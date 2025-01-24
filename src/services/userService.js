const {UserRepository} = require('../repositories');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class UserService {
  async createUser(userData) {
    userData.password = await bcrypt.hash(userData.password, 10);
    return await UserRepository.create(userData);
  }

  async loginUser(credentials) {
    const user = await UserRepository.findByEmail(credentials.email);

    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

module.exports = new UserService();


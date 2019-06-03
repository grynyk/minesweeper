import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../index';

const Middleware = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id,username) {
    const token = jwt.sign({
      userId: id,
      username: username,
    },
      process.env.SECRET, { expiresIn: '1d' }
    );
    return token;sfd
  },
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);

      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = rows[0];
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Middleware;
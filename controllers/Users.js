import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Middleware from './Middleware';

const Users = {
  async getMyData(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM users where id = $1', [req.user.id]);
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async createUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    const hashPassword = Middleware.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, username, password, created_date, wins, losts)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.username,
      hashPassword,
      moment(new Date()),
      0,
      0
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Middleware.generateToken(
        rows[0].id,
        rows[0].username);
      return res.status(201).send({ token });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
   async login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }

    const userData = 'SELECT * FROM users WHERE username = $1';
    try {
      const { rows } = await db.query(userData, [req.body.username]);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The credentials you provided are incorrect' });
      }
      if (!Middleware.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided are incorrect' });
      }
      const token = Middleware.generateToken(
        rows[0].id,
        rows[0].username);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
export default Users;
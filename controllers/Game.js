import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Middleware from './Middleware';

const Game = {
    async getAll(req, res) {
        try {
            const { rows, rowCount } = await db.query('SELECT * FROM game_results ORDER BY created_date DESC');
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async createRecord(req, res) {
        const createQuery = `INSERT INTO
      game_results(id, created_date, result, user_id, dimensions)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            uuid.v4(),
            moment(new Date()),
            req.body.result,
            req.params.user_id,
            req.dimensions.result,
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send({ 'message': 'Record created successfully' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
}
export default Game;
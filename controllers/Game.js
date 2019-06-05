import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Middleware from './Middleware';

const Game = {
    async getAll(req, res) {
        try {
            const { rows, rowCount } = await db.query('SELECT * FROM game_results WHERE user_id = $1 ORDER BY created_date DESC', [req.user.id]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async createRecord(req, res) {
        try {
            await db.query(`INSERT INTO
            game_results(id, created_date, win, user_id, dimensions, score, mode)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            returning *`, [
                uuid.v4(),
                moment(new Date()),
                req.body.win,
                req.user.id,
                req.body.dimensions,
                req.body.score,
                req.body.mode,
            ]);

            if(req.body.win) {
                await db.query(`UPDATE users
                SET wins = wins + 1
                WHERE id = $1;`, [req.user.id]);
            } else {
                await db.query(`UPDATE users
                SET losts = losts + 1
                WHERE id = $1;`, [req.user.id]);
            }

            return res.status(201).send({ 'message': 'Record created successfully' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
}
export default Game;
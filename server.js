import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Users from './controllers/Users';
import Game from './controllers/Game';
import Middleware from './controllers/Middleware';

dotenv.config();

const app = express();

app.use(express.json())

app.post('/api/users/register', Users.createUser);
app.post('/api/users/login', Users.login);
app.get('/api/users/getMyData', Middleware.verifyToken, Users.getMyData);

app.post('/api/game/records', Game.createRecord);
app.get('/api/game/records', Game.getAll);

app.get('/', (req, res) => {
  return res.status(200).send({ 'message': 'Welcome to Minesweeper game' });
});

app.listen(3000);
console.log('app running on port ', 3000);

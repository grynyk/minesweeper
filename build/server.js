'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Users = require('./controllers/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Game = require('./controllers/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Middleware = require('./controllers/Middleware');

var _Middleware2 = _interopRequireDefault(_Middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.post('/api/users/register', _Users2.default.createUser);
app.post('/api/users/login', _Users2.default.login);
app.get('/api/users/getMyData', _Middleware2.default.verifyToken, _Users2.default.getMyData);

app.post('/api/game/records', _Game2.default.createRecord);
app.get('/api/game/records', _Game2.default.getAll);

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'Welcome to Minesweeper game' });
});

app.listen(3000);
console.log('app running on port ', 3000);
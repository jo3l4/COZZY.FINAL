const config = require("./config");
const express = require('express');
const cors = require('cors');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.use(cors());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(config.port, () => {
  console.log("The server is up on port", config.port);
});
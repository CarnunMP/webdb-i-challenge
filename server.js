const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => genericError(err));
});

server.get('/accounts/:id', (req, res) => {
  const { id } = req.params;

  db('accounts').where({ id })
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => genericError(err));
});

function genericError(err) {
  return res.status(500).json({
    message: "Error: " + err.message,
  });
}

module.exports = server;
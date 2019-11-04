const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => genericError(err, res));
});

server.get('/accounts/:id', (req, res) => {
  const { id } = req.params;

  db('accounts').where({ id })
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => genericError(err, res));
});

server.post('/accounts', (req, res) => {
  const { body } = req;

  if (!body || !body.name || !body.budget) {
    res.status(400).json({
      message: "Request body must include name [String] and budget [Float] fields."
    });
  } else {
    db('accounts').insert(body)
      .then(idArray => {
        res.status(201).json({
          message: "Successfully created a new acount with an id of " + idArray[0],
        });
      })
      .catch(err => genericError(err, res));
  }
});

function genericError(err, res) {
  return res.status(500).json({
    message: "Error: " + err.message,
  });
}

module.exports = server;
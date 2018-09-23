const express = require('express');
const router = express.Router();
const bitcoinMessage = require('bitcoinjs-message');

const simpleChain = require('../app/simpleChain');

router.get('/address::address', function (req, res, next) {
  const address = req.params.address;
  // check request param
  if (!address) {
    res.send({error: "GET Format Error(require param): address"});
    return;
  }

  let response = [];
  simpleChain.db.createReadStream().on('data', (data) => {
    const block = JSON.parse(data.value);
    if (block.body.address === address) {
      response.push(block);
    }
  }).on('error', (err) => {
    console.log('Unable to read data stream!', err);
  }).on('close', () => {
    res.send(response);
  });
});

router.get('/hash::hash', function (req, res, next) {
  const hash = req.params.hash;
  // check request param
  if (!hash) {
    res.send({error: "GET Format Error(require param): hash"});
    return;
  }

  simpleChain.db.createReadStream().on('data', (data) => {
    const block = JSON.parse(data.value);
    if (block.hash === hash) {
      res.send(block);
    }
  }).on('error', (err) => {
    console.log('Unable to read data stream!', err);
  }).on('close', () => {
  });
});

module.exports = router;

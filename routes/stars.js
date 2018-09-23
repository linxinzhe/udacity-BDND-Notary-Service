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

});

router.get('/hash::hash', function (req, res, next) {
  const hash = req.params.hash;
  // check request param
  if (!hash) {
    res.send({error: "GET Format Error(require param): hash"});
    return;
  }

});

module.exports = router;

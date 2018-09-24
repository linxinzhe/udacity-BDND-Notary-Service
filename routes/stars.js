const express = require('express');
const router = express.Router();
const bitcoinMessage = require('bitcoinjs-message');

const simpleChain = require('../app/simpleChain');

router.get('/address::address', function (req, res, next) {
  const address = req.params.address;
  // CHECK request param
  if (!address) {
    res.json({error: "GET Format Error(require param): address"});
    return;
  }

  let response = [];
  simpleChain.db.createReadStream().on('data', (data) => {
    const block = JSON.parse(data.value);
    if (block.body.address === address) {
      const storyEncoded = block.body.star.story;
      const storyDecoded = Buffer.from(storyEncoded, 'hex').toString('utf8');
      block.body.star.storyDecoded = storyDecoded;

      response.push(block);
    }
  }).on('error', (err) => {
    console.log('Unable to read data stream!', err);
  }).on('close', () => {
    res.json(response);
  });
});

router.get('/hash::hash', function (req, res, next) {
  const hash = req.params.hash;
  // CHECK request param
  if (!hash) {
    res.json({error: "GET Format Error(require param): hash"});
    return;
  }

  simpleChain.db.createReadStream().on('data', (data) => {
    const block = JSON.parse(data.value);
    if (block.hash === hash) {
      const storyEncoded = block.body.star.story;
      const storyDecoded = Buffer.from(storyEncoded, 'hex').toString('utf8');
      block.body.star.storyDecoded = storyDecoded;
      res.json(block);
    }
  }).on('error', (err) => {
    console.log('Unable to read data stream!', err);
  }).on('close', () => {
  });
});

module.exports = router;

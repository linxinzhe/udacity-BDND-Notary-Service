const express = require('express');
const router = express.Router();

const simpleChain = require('../app/simpleChain');

router.get('/:blockHeight', function (req, res, next) {
  const blockHeight = req.params.blockHeight;
  // check request param
  if (!blockHeight) {
    res.send({error: "JSON Format Error(require param): blockHeight"});
    return
  }

  simpleChain.Blockchain.getBlock(blockHeight).then((jsonStr) => {
    res.send(jsonStr);
  });
});

router.post('/', function (req, res, next) {
  const address = req.body.address;
  const star = req.body.star;
  // check request param
  if (!address || !star) {
    res.send({error: "JSON Format Error(require param): address, star"});
    return
  }

  const dec = star.dec;
  const ra = star.ra;
  const story = star.story;
// check request param
  if (!dec || !ra || !story) {
    res.send({error: "JSON Format Error(star require param): dec, ra, story"});
    return
  }

  star.story = Buffer.from(story, 'ASCII').toString('hex');
  const blockBody = {
    address: address,
    star: star,
  };

  // const body = JSON.stringify(blockBody);
  simpleChain.Blockchain.addBlock(new simpleChain.Block(blockBody)).then((jsonStr) => {
    res.send(jsonStr);
  });
});

module.exports = router;
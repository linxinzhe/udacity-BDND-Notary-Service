const express = require('express');
const router = express.Router();

const simpleChain = require('../app/simpleChain');

router.get('/:blockHeight', function (req, res, next) {
  const blockHeight = req.params.blockHeight;
  // CHECK request param
  if (!blockHeight) {
    res.json({error: "JSON Format Error(require param): blockHeight"});
    return
  }

  simpleChain.Blockchain.getBlock(blockHeight).then((block) => {
    if (blockHeight !== 0) {
      const storyEncoded = block.body.star.story;
      const storyDecoded = Buffer.from(storyEncoded, 'hex').toString('utf8');
      block.body.star.storyDecoded = storyDecoded;
    }

    res.json(block);
  });
});

router.post('/', function (req, res, next) {
  const address = req.body.address;
  const star = req.body.star;
  // CHECK request param
  if (!address || !star) {
    res.json({error: "JSON Format Error(require param): address, star"});
    return
  }

  const dec = star.dec;
  const ra = star.ra;
  const story = star.story;
  // CHECK request param
  if (!dec || !ra || !story) {
    res.json({error: "JSON Format Error(star require param): dec, ra, story"});
    return
  }

  // CHECK ASCII encoding
  for (let c of story) {
    const charCode = c.charCodeAt(0);
    if (charCode > 127) {
      res.json({error: "JSON Input Error(story require only in ASCII encoding)"});
      return
    }
  }
  // CHECK ASCII length<250
  if (story.length > 250) {
    res.json({error: "JSON Input Error(story should be less than 250 words)"});
    return
  }


  // CHECK register validation
  if (req.session[address]) {
    const registerStar = req.session[address]["registerStar"];
    if (!registerStar) {
      res.json({error: "Register Error(require requestValidation and message-signature/validate)"});
      return
    }
  } else {
    res.json({error: "Register Error(require requestValidation and message-signature/validate)"});
    return;
  }


  star.story = Buffer.from(story, 'ASCII').toString('hex');
  const blockBody = {
    address: address,
    star: star,
  };

  simpleChain.Blockchain.addBlock(new simpleChain.Block(blockBody)).then((block) => {
    // invalid register: can register only a single star
    req.session[address] = null;

    res.json(block);
  });
});

module.exports = router;
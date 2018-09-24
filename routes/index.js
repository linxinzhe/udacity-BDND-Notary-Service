const express = require('express');
const router = express.Router();
const bitcoinMessage = require('bitcoinjs-message');

const simpleChain = require('../app/simpleChain');

const VALIDATION_WINDOW = 300;
router.post('/requestValidation', function (req, res, next) {
  const address = req.body.address;
  // CHECK request param
  if (!address) {
    res.json({error: "JSON Format Error(require param): address"});
    return
  }

  let requestTimeStamp = "";
  let message = "";
  let validationWindow = "";

  if (req.session[address]) {
    requestTimeStamp = req.session[address].requestTimeStamp;
    validationWindow = VALIDATION_WINDOW - (new Date().getTime() - requestTimeStamp) / 1000;
  } else {
    requestTimeStamp = new Date().getTime();
    validationWindow = VALIDATION_WINDOW;
    req.session[address] = {address: address, requestTimeStamp: requestTimeStamp};
  }
  message = address + ":" + requestTimeStamp + ":" + "starRegistry";

  const response = {
    address: address,
    requestTimeStamp: requestTimeStamp,
    message: message,
    validationWindow: validationWindow,
  };
  res.json(response);
});

router.post('/message-signature/validate', function (req, res, next) {
  const address = req.body.address;
  const signature = req.body.signature;
// CHECK request param
  if (!address || !signature) {
    res.json({error: "JSON Format Error(require param): address, signature"});
    return
  }
// CHECK session
  if (!req.session[address]) {
    res.json({error: "Session Error(require requestValidation)"});
    return;
  }

  let registerStar = false;
  let requestTimeStamp = "";
  let message = "";
  let validationWindow = "";
  let messageSignature = "";

  if (req.session[address]) {
    requestTimeStamp = req.session[address].requestTimeStamp;
    validationWindow = VALIDATION_WINDOW - (new Date().getTime() - requestTimeStamp) / 1000;
    message = address + ":" + requestTimeStamp + ":" + "starRegistry";
    registerStar = bitcoinMessage.verify(message, address, signature);
  } else {
    registerStar = false;
  }

  req.session[address]["registerStar"] = registerStar;

  // not valid then hide
  if (!registerStar) {
    requestTimeStamp = "";
    message = "";
  }

  if (registerStar) {
    messageSignature = "valid";
  }

  const response = {
    registerStar: registerStar,
    status: {
      address: address,
      requestTimeStamp: requestTimeStamp,
      message: message,
      validationWindow: validationWindow,
      messageSignature: messageSignature,
    }
  };
  res.json(response);
});


module.exports = router;

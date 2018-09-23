const express = require('express');
const router = express.Router();
const bitcoinMessage = require('bitcoinjs-message');

const simpleChain = require('../app/simpleChain');

const VALIDATION_WINDOW = 300;
router.post('/requestValidation', function (req, res, next) {
  const address = req.body.address;
  // check request param
  if (!address) {
    res.send({error: "JSON Format Error(require param): address"});
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
  res.send(JSON.stringify(response));
});

router.post('/message-signature/validate', function (req, res, next) {
  const address = req.body.address;
  const signature = req.body.signature;
// check request param
  if (!address || !signature) {
    res.send({error: "JSON Format Error(require param): address, signature"});
    return
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
  res.send(JSON.stringify(response));
});


module.exports = router;

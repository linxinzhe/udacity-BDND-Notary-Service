const express = require('express');
const router = express.Router();

const simpleChain = require('../app/simpleChain');

const VALIDATION_WINDOW = 300;
router.post('/requestValidation', function (req, res, next) {
  const address = req.body.address;
  let requestTimeStamp = "";
  let message = "";
  let validationWindow = "";

  if (req.session[address]) {
    requestTimeStamp = req.session[address].requestTimeStamp;
    validationWindow = VALIDATION_WINDOW - (new Date().getTime() - requestTimeStamp) / 1000;
    if (validationWindow < 0) {

    }
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


module.exports = router;

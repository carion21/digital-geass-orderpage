const express = require('express');

const { getMoment } = require('../../config/utils');
const { APP_NAME, APP_DESCRIPTION } = require('../../config/consts');
const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/', async function (req, res, next) {

  res.render(
    "home/success", {
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,
    pageDescription: "Success",
    service: service
  })
});


module.exports = router;
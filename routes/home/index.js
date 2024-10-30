const express = require('express');

const { getMoment } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/', async function (req, res, next) {

  res.render(
    "home/index", {
    title: APP_NAME,
    service: service
  })
});


module.exports = router;
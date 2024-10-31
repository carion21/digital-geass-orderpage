const express = require('express');

const { getMoment } = require('../../config/utils');
const { APP_NAME, APP_DESCRIPTION } = require('../../config/consts');
const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/:tunnel_code', async function (req, res, next) {

  res.render(
    "home/info", {
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,
    pageDescription: "Notification",
    service: service,
    tunnel_code: req.params.tunnel_code
  })
});


module.exports = router;
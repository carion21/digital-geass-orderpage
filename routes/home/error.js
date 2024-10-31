const express = require('express');

const { getMoment } = require('../../config/utils');
const { APP_NAME, APP_DESCRIPTION } = require('../../config/consts');
const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/:tunnel_code', async function (req, res, next) {

  res.render(
    "home/error", {
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,
    pageDescription: "Erreur",
    service: service,
    tunnel_code: req.params.tunnel_code
  })
});


module.exports = router;
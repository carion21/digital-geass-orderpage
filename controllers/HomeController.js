const express = require('express');
const router = express.Router();

const service = 'home'

// routers
const index = require('../routes/' + service + '/index')
const payment = require('../routes/' + service + '/payment')
const success = require('../routes/' + service + '/success')

// routes with each router
router.use('/', index)
router.use('/payment', payment)
router.use('/success', success)


module.exports = router;
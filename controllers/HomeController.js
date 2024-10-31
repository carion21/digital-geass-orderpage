const express = require('express');
const router = express.Router();

const service = 'home'

// routers
const index = require('../routes/' + service + '/index')
const payment = require('../routes/' + service + '/payment')
const success = require('../routes/' + service + '/success')
const error = require('../routes/' + service + '/error')
const info = require('../routes/' + service + '/info')

// routes with each router
router.use('/', index)
router.use('/payment', payment)
router.use('/success', success)
router.use('/error', error)
router.use('/info', info)


module.exports = router;
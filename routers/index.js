const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/:category/:alphabet', Controller.show)

module.exports = router
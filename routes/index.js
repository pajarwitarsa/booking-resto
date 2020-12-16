const router = require('express').Router();
const Controller = require('../controllers/controller.js');

router.get('/login', Controller.showLoginForm);

module.exports = router;
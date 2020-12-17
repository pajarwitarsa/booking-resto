const router = require('express').Router();
const Controller = require('../controllers/controller.js');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/register', Controller.showRegisterForm)
router.post('/register', Controller.register);

router.get('/login', Controller.showLoginForm);
router.post('/login', Controller.login)

router.get('/home', Controller.showHomePage);
router.get('/restaurants', Controller.showRestoList);


module.exports = router;
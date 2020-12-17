const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const auth = require('../middlewares/auth.js');



router.get('/', (req, res) => {
  if(req.session.name) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

router.get('/register', Controller.showRegisterForm)
router.get('/login', Controller.showLoginForm);
router.get('/logout', Controller.logout);
router.post('/login', Controller.login)
router.post('/register', Controller.register);

router.use(auth);

router.get('/home', Controller.showHomePage);
router.get('/restaurants', Controller.showRestoList);


module.exports = router;
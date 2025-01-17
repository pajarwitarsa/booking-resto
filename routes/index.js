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
router.post('/register', Controller.register);

router.get('/login', Controller.showLoginForm);
router.post('/login', Controller.login)

router.get('/logout', Controller.logout);

router.use(auth);

router.get('/home', Controller.showHomePage);
router.get('/restaurants', Controller.showRestoList);
router.get('/restaurants/edit/:id', Controller.editFormResto);
router.post('/restaurants/edit/:id', Controller.updateResto);

router.get('/restaurants/booking/:id', Controller.bookingFormResto);
router.post('/restaurants/booking/:id', Controller.bookNewResto);

router.get('/restaurants/bookingList/:id', Controller.showAllBookings);

router.get('/restaurants/delete/:id', Controller.deleteRestaurant);




module.exports = router;
const {User, Restaurants} = require('../models/');

class Controller {
  static showLoginForm(req, res) {
    res.render('loginForm');
  }
  static showHomePage(req, res) {
    res.render('homePage');
  }
  
  static showRegisterForm(req,res) {
    res.render('registrationForm')
  }

  static showRestoList(req, res) {
    Restaurants.findAll()
      .then(data => res.render('restaurants', {data}))
  }

  static register(req, res) {    
    const {username, password, rePassword, first_name, last_name} = req.body;
    const newUser = {username, password, rePassword, first_name, last_name};
    if(password !== rePassword) {
      res.send('Password Doesnt Match');
    } else {
      User.create(newUser)
      .then( () => res.redirect('/home'))
      .catch(err => {
        if(err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(error => error.message);
          res.send(errors)
        } else {
          res.send(err)
        }
      });
    }    
  }
}

module.exports = Controller;
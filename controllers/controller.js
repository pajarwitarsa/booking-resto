const {User} = require('../models/');

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

  }

  static register(req, res) {    
    const {username, password, rePassword, first_name, last_name} = req.body;
    const newUser = {username, password, rePassword, first_name, last_name};
    User.create(newUser)
      .then( () => res.redirect('/home'))
      .catch(err => console.log(err));
  }
  static login (req,res) {
    const {username, password} =req.body
    User.findOne({where: {username, password}})
    .then((data) => {
      if(data) {
        req.session.username = username
        res.redirec("/home")
      }
    })
    .catch((err) => {
      res.send(err)
    })
  }
  
}

module.exports = Controller;
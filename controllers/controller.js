const {User, Restaurant} = require('../models/');

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
    Restaurant.findAll()
      .then(data => res.render('restaurants', {data}))
  }

  static register(req, res) {    
    const {username, password, rePassword, first_name, last_name} = req.body;
    const newUser = {username, password, rePassword, first_name, last_name};
    if(password !== rePassword) {
      res.send('Password Doesnt Match');
    } else {
      User.create(newUser)
      .then( () => res.redirect('/login'))
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
  
  static login (req,res) {
    const {username, password} = req.body
    User.findOne({where: {username}})
    .then((data) => {
      if(data && User.comparePass(password, data.password)) {
        req.session.username = username
        res.redirect("/home")
      } else {
        res.send('Username Atau Password Salah');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  static logout(req, res) {
    delete req.session.username;
    res.redirect('/login');
  }

  static editFormResto (req,res) {
    const {id} = req.params
    Restaurant.findByPk(id)
    .then(data=> {

      res.render('editFormResto', {resto: data})
    })
  }
  
  static updateResto (req,res) {
    const {name,address, phone,opening_hours, closing_hours } = req.body
    const updateResto = {name,address, phone,opening_hours, closing_hours }
    const {id} = req.params
    Restaurant.update(updateResto, {where: {id}})
    .then(data => {
      res.redirect('/restaurants')
    })
    .catch(err => {
      res.send(err)
    })
  }

}

module.exports = Controller;
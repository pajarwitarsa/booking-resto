const {User, Restaurant, Booking} = require('../models/');

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

  static bookingFormResto(req, res) {
    const id = +req.params.id;
    let restaurant;
    Restaurant.findByPk(id)
      .then(data => {
        restaurant = data;
        return User.findOne({where: {username: req.session.username}})
      })
      .then(user => res.render('bookingForm', {restaurant, user}))
      .catch(err => res.send(err))
  }

  static bookNewResto(req, res) {
    const RestaurantId = +req.params.id;
    const {date, time, UserId} = req.body;
    const newBook = {UserId, RestaurantId, UserId, bookingDate: date + ' ' + time};
    Booking.create(newBook)
      .then( () => res.redirect('/restaurants'))
      .catch(err => console.log(err));    
  }

  static showAllBookings(req, res) {
    const id = +req.params.id;
    Restaurant.findOne({
      where: {id},
      include: {
        model: User
      }
    })
      .then(data => res.render('bookingList', {data}))
      .catch(err => res.send(err))
  }

  static deleteRestaurant(req, res) {
    const id = +req.params.id;
    Restaurant.destroy({where: {id}})
      .then(res.redirect(`/restaurants`))
      .catch(err => res.send(err))
  }

}

module.exports = Controller;
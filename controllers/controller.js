class Controller {
  static showLoginForm(req, res) {
    res.render('loginForm');
  }
  static showRegisterForm(req,res) {
    res.render('registrationForm')
  }
}

module.exports = Controller;


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
}

module.exports = Controller;
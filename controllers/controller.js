

class Controller {
  static showLoginForm(req, res) {
    res.render('loginForm');
  }

  static showHomePage(req, res) {
    res.render('homePage');
  }

  static showRestoList(req, res) {
    client.search({
      lat:"-6.179794", //latitude
      lon:"106.631882" //longitude  
    })
    .then(result => {
      let restos = result.restaurants;
      res.render('restaurants', {restos});
    })
    .catch(err => console.log(err));    
  }
}

module.exports = Controller;
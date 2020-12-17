function auth(req, res, next) {
  console.log(req.session.username);
  if(req.session.username) {
    next()
  } else {
    res.send('Please Login First')
  }
}

module.exports = auth;
function auth(req, res, next) {
  if(req.session.username) {
    next()
  } else {
    res.send('Please Login First')
  }
}

module.exports = auth;
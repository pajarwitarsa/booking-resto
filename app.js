const express = require('express');
const router = require('./routes/index.js');
const app = express();
const port = 3000;
const session = require('express-session')

app.use(session({
  secret:"zotomat",
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
});



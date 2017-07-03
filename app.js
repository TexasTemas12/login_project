const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const expressSession = require('express-session');

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressSession({
  secret: 'password321',
  resave: false,
  saveUnitialized: true
}))

app.get('/', function(req, res) {
  res.render('index', {
    Welcome: 'I made it to the home page.',
  })
})

var userInputArray = [{
  username: "thomas",
  password: "password123",
}, {
  username: "treckling",
  password: "boom",
}];

var loggedIn = 0;


app.get('/login', function(req, res) {
  res.render('login', {
    Login_Welcome: 'Hi you can log in here.'
  })
})

app.get('/', function(req, res) {
  sess = req.session
  for (var i = 0; i < userInputArray.length; i++) {
    if (userInputArray[i].username === sess.username && userInputArray[i].password === sess.password) {
      loggedIn = 1

    }
  }
  if (loggedIn === 1) {

    return res.render('index', {
      userShow: sess.userInput
    })
  }
})


app.post('/loggedin', function(req, res) {
  sess = req.session;
  sess.userInput = req.body.username;
  sess.passwordInput = req.body.password;
  console.log("name: ", sess.userInput, " ", "password: ", sess.passwordInput);
  for (i = 0; i < userInputArray.length; i++) {
    if (userInputArray[i].username === sess.userInput && sess.passwordInput === userInputArray[i].password) {
      console.log("input validated")
      loggedIn = 1
    }
  }
  return res.redirect('/')
})



app.listen(3000, function() {
  console.log('listening at 3000')
})

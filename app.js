const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

function authenticate(username, password) {
  try {
    return users.find(user => user.username === username && user.password === password);
  } catch (error) {
    console.error('Error occurred during authentication:', error);
    throw new Error('Authentication failed');
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authenticate(username, password);
  if (user) {
    req.session.authenticated = true;
    req.session.user = user;
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error occurred during logout:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Logged out');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
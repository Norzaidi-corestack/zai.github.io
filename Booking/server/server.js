const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const PORT = 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'Public'))); // serve static files
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Make flash messages available in every HTML file
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Serve HTML files
app.get('/login', (req, res) => {
res.sendFile(path.join(__dirname, '..', 'Public', 'login.html'));
});

app.get('/register', (req, res) => {
  const filePath = path.join(__dirname, '..', 'Public', 'register.html');
  console.log("Trying to serve:", filePath);
  res.sendFile(filePath);
});

app.get('/protected', (req, res) => {
  if (!req.session.user) {
    req.flash('error', 'You must log in first.');
    return res.redirect('/login');
  }
  res.send(`<h2>Protected Page</h2><p>Welcome, ${req.session.user}!</p><a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.existsSync(USERS_FILE) ? fs.readFileSync(USERS_FILE) : '[]');

  const userExists = users.find(u => u.username === username);
  if (userExists) {
return res.redirect('/register?error=' + encodeURIComponent('Username already exists.'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.redirect('/login?success=' + encodeURIComponent('Registration successful. You can now log in.'));
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.existsSync(USERS_FILE) ? fs.readFileSync(USERS_FILE) : '[]');

  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash('error', 'Invalid username or password.');
    return res.redirect('/login?error=' + encodeURIComponent('Invalid username or password.'));
  }

  req.session.username = user.username;
  res.redirect(`/login.html?success=${encodeURIComponent(`Hi ${user.username}, you're in!`)}`);
}); 
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

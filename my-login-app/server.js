const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Fake database (in-memory)
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send(`<h2>Welcome, ${req.session.user.username}!</h2><a href="/logout">Logout</a>`);
    } else {
        res.redirect('/login.html');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (users.find(u => u.username === username)) {
        return res.send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.send('Registration successful. <a href="/login.html">Login here</a>');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.send('User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Incorrect password.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login.html');
    });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});
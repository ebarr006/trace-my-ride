require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware/auth');
const UserService = require('./services/UserService');
const users = require('./routes/users');
const trips = require('./routes/trips');
const port = process.env.PORT || 3000

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    if ((!email && password && username)) {
      res.status(400).send('All input is required');
    }

    const exists = await UserService.getUser(
      { email },
      { trips: true }
    );
    if (exists) {
      console.log('User already exists! Please login');
      return res.status(409).send('User already exists! Please login');
    }

    let encryptedPass = await bcrypt.hash(password, 10);
    const user = await UserService.createUser(
      {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: encryptedPass,
      },
      { trips: true }
    );

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );

    user.token = token;

    res.status(201).json(user);

  } catch (e) {
    console.log(e);
    res.sendStatus(400)
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('All input is required.');
    }

    const user = await UserService.getUser(
      { email },
      { trips: true }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' },
      );

      user.token = token;

      // console.log('Logged in as: ', user);
      res.status(200).send(user)
    } else {
      throw Error('Invalid Credentials')
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.get('/ping', auth, (req, res) => {
  res.status(200).send('pong ???? ');
});

app.use('/api/users', auth, users);
app.use('/api/trips', auth, trips);

app.listen(port, () => {
  console.log(`Trace-My-Data is running.`)
})

module.exports = app;
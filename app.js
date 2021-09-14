require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const UserService = require('./services/UserService');
const users = require('./routes/users');
const port = process.env.PORT || 3000

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, trackingId } = req.body
    if ((!email && password && username && trackingId)) {
      res.status(400).send('All input is required');
    }

    const exists = await UserService.getUser({ email });
    if (exists) {
      console.log(`Found: ${exists}`);
      return res.status(409).send('User already exists! Please login');
    }

    let encryptedPass = await bcrypt.hash(password, 10);
    const user = await UserService.createUser({
      username,
      email: email.toLowerCase(),
      password: encryptedPass,
      trackingId
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );

    user.token = token;

    res.status(201).json(user);

  } catch (e) {
    console.log(e);
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('All input is required.');
    }

    const user = await UserService.getUser({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' },
      );

      user.token = token;

      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials');
  } catch (e) {
    console.log(e);
  }
});

app.get('/ping', auth, (req, res) => {
  res.status(200).send('pong 🙌 ');
});

app.use('/api', auth, users);

app.listen(port, () => {
  console.log(`Trace-My-Data is running.`)
})

module.exports = app;
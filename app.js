require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./model/user');
const port = process.env.PORT || 3000

const app = express();

app.use(express.json());

app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if ((!email && password && username)) {
      res.status(400).send('All input is required');
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).send('User already exists!. Please login');
    }

    let encryptedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPass,
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

    const user = await User.findOne({ email });

    console.log(user.password);

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

app.listen(port, () => {
  console.log(`Trace-My-Data is running.`)
})

module.exports = app;
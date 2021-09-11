const express = require('express')
const app = express()
const { User, Coordinate } = require('./mongo')
port = 8000

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await User.find({})
    .then(result => result)
    .catch(err => err);
  console.log(users);
  res.send(users);
})

app.post('/users', async (req, res) => {
  const { name, trackingId } = req.body;
  const user = new User({
    name,
    trackingId
  });
  const result = await user.save().catch(err => {
    console.log(`Failed to save: ${err}`);
    return err;
  });
  res.send(result);
});

app.get('/wipe', async (req, res) => {
  const result = await User.deleteMany({});
  res.send(result);
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:8000')
})

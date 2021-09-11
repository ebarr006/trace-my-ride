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

app.delete('/users', async (req, res) => {
  const { id } = req.query;
  const users = await User.deleteMany({ trackingId: id })
    .then(result => result)
    .catch(err => err);
  res.send(users);
})

app.get('/wipe-users', async (req, res) => {
  const result = await User.deleteMany({});
  res.send(result);
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

app.get('/coordinates', async (req, res) => {
  const coordinates = await Coordinate.find({})
    .then(result => result)
    .catch(err => err);
  console.log(coordinates);
  res.send(coordinates);
})

app.post('/coordinates', async (req, res) => {
  const { trackingId, lat, lng } = req.body;
  const coordinate = new Coordinate({
    trackingId,
    lat,
    lng
  });
  const result = await coordinate.save().catch(err => {
    console.log(`Failed to save: ${err}`);
    return err;
  });
  res.send(result);
});

app.delete('/coordinates', async (req, res) => {
  const { id } = req.query;
  const coordinates = await Coordinate.deleteMany({ trackingId: id })
    .then(result => result)
    .catch(err => err);
  res.send(coordinates);
})

app.get('/wipe-coordinates', async (req, res) => {
  const result = await Coordinate.deleteMany({});
  res.send(result);
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:8000')
})

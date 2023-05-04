const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ImageKit = require('imagekit');
const AuthRouter = require('./routes/auth');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

// ImageKitIO initialization
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEIO_PUBLIC_KEY,
  privateKey: process.env.IMAGEIO_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEIO_URL_ENDPOINT
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_APP_ORIGINS,
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.send('hello world!');
});

// ImageKitIO authentication
app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use('/auth', AuthRouter);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB database');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database:', error.message);
  });

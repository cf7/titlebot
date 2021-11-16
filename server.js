const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '/build'))); // serve these files



app.post('/lookup', (req, res) => {
  console.log(req);
  res.status(200).send("Lookup!");
  /*
    axios.get(req.data.url)
      .then((response) => {
  
      })
      .catch((error) => {
  
      });
  */
});

app.get('/', (req, res) => {
  res.sendFile("/index.html");
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
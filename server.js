const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));




app.post('/lookup', (req, res) => {
  console.log(req);
  res.status(200).send("Lookup!");
});

app.get('/', (req, res) => {
  res.status(200).send('Success!'); // sendFile("./public/index.html");
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
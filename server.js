const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan());


app.get('/', (req, res) => {
  res.status(200).send("Success!");
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
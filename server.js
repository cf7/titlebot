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
app.use(morgan('combined'));

app.use('/', express.static(path.join(__dirname, '/build'))); // serve these files



app.post('/lookup', (req, res) => {
  // console.log(req);
  console.log(req.body);
  // res.status(200).send("Lookup!");
  console.log(req.body.data);
  console.log("submitted");
  if (req.body) {
    axios.get(req.body.data)
      .then((response) => {
        console.log(response);
        console.log(response.data.match(/(<title.*>).*(<\/title>)/));
        let tag = response.data.match(/(<title.*>).*(<\/title>)/)[0];
        console.log(tag);
        let title = tag.match(/(?:<title.*>)(.*)(?:<\/title>)/)[1]; 
        console.log(title);
        // res.data = { title: title };
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  } else {
    res.status(204).send("No data sent with request");
  }
});

app.get('/', (req, res) => {
  res.sendFile("/index.html");
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
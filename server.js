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
  res.status(200).send("Lookup!");
  console.log("submitted");
  // axios.get(req.form.data)
  //   .then((response) => {
          // console.log(response);
          // console.log(response.data);
          // console.log(response.data.title.match(/(<title.*>).*(<\/title>)/));
          // let data1 = response.data.title.match(/(<title.*>).*(<\/title>)/);
          // console.log(data1);
          // // let data2 = data1[0].match(/(>).*(<\/)/);
          // // console.log(data2);
          // let title = data1[0].match(/[>](.*)[<][/]/)[1];
          // console.log(title);
  //   })
  //   .catch((error) => {

  //   });
});

app.get('/', (req, res) => {
  res.sendFile("/index.html");
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
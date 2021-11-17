const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use('/', express.static(path.join(__dirname, '/build'))); // serve these files



// not sure how to configure preflight requests
// to check sites for CORS
app.post('/lookup', (req, res) => {
  if (req.body && req.body.data) {
    console.log(req.body.data);
    axios.get(req.body.data)
      .then((response) => {
        // yes, I could have used something like Cheerio, but I have fun with regexes.
        if (response.data) {
          let tag = response.data.match(/(<title.*>).*(<\/title>)/)[0];
          let title = tag.match(/(?:<title.*>)(.*)(?:<\/title>)/)[1];
          console.log(title);
          res.status(200).send({ title: title });
        } else {
          res.status(204).send("No html available")
        }
      })
      .catch((error) => {
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
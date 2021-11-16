import React from 'react';
// import logo from './logo.svg';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


let env = process.env.NODE_ENV;

if (env && env == 'development') {
  const mock = new MockAdapter(axios);
  mock.onPost("/lookup").reply(200, {
    // title: "<title>Fake Title</title>",
  });
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayURL: '',
      url: '',
      title: 'Website Title Appears Here',
      alert: false, // true, // default false
      alertVariant: 'danger',
      alertIndex: 0,
    };
    this.suffixes = ['.com','.org','.edu','.net','.ai'];
    this.alertMessages = [ 
      "Please provide a url to a website's homepage",
      "url must have prefix 'https://' or 'http://'",
      "Website valid but no title found",
    ];
  }

  handleChange = (event) => {
    event.persist();
    // console.log(event);
    this.setState({ displayURL: event.target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.displayURL) {
      // let matches = this.state.displayURL.match(/(https?:\/\/)?.*(\.com|\.org|\.edu|\.net|\.io|\.ai)/);
      // let inputURL = matches[0];

      let inputURL = this.state.displayURL;
      console.log(inputURL);
      if (inputURL.includes('https://')) {
        inputURL = inputURL.split('https://')[1];
      } else if (inputURL.includes('http://')) {
        inputURL = inputURL.split('http://')[1];
      } else {
        this.setState({
          alert: true,
          alertVariant: 'danger',
          alertIndex: 1,
        });
      }
      this.suffixes.forEach((s) => {
        let indices = [];
        if (inputURL.includes(s)) {
          inputURL.indexOf(s);
        }
        let closest = this.suffixes[Math.min(...indices)];
        inputURL = inputURL.split(closest)[0];
      });
      console.log(inputURL);
      // (https:\/\/)?.*(\.com|\.org|\.edu|\.net|\.io|\.ai)

      let form = new FormData();    
      form.append('data', 'https://' + inputURL + '.com');
      axios.post('/lookup', form)
        .then((response) => {
          if (response.title) {
            this.setState({ 
              title: title,
              alert: false,
            });
          } else {
            this.setState({
              alert: true,
              alertVariant: 'warning',
              alertIndex: 2
            });
          }
        }).catch((e) => {
          console.error(e);
        });
    } else {
      this.setState({ 
        alert: true,
        alertVariant: 'danger',
        alertIndex: 0 
      });
    }
  }

  render = () => {
    return (
      <Container className="App">
      <Row>
        <h1>Titlebot</h1>
      </Row>
      <Row className="description">
        <Col>
        <h5>Welcome to Titlebot!</h5>
        <p>To get started, try inputting a url in the text field below and click [Lookup]. This app only works for homepage urls. If given jumbled input, the app will search for the first occurence of a valid url if one exists.</p>
        <figure>
          <h6>The following are examples of valid urls:</h6>
          <ul className="valid-inputs">
            <li>https://chatmeter.com (ideal)</li>
            <li>chatmeter.com</li>
          </ul>
        </figure>
        </Col>
        <Col>
        <h5>Valid url suffixes: .com | .org | .edu | .net | .ai</h5>
        <p>The app uses regex matching and will search using the first occurrence of a "complete" url. (A url substring that is "valid" and ends with a valid suffix (e.g. ".com").</p>
        <figure>
          <h6>The following are examples of invalid urls:</h6>
            <ul className="invalid-inputs">
              <li>httasdfasdfps://chatmeter.com</li>
              <li>chatmeter.comasdfasdf</li>
              <li>asdfasdf.chatmeter.com</li>
              <li>asdfasdfchatmeter.com</li>
            </ul>
        </figure>
        </Col>
      </Row>
      <Row className="form-view">
      <Col>
        <Form className="input-form">
          <Row>
            <Col>
              <Form.Control
                as="input"
                onChange={this.handleChange}
                value={this.state.displayURL}
              >
              </Form.Control>
              <Alert variant={this.state.alertVariant} show={this.state.alert} >
                { this.alertMessages[this.state.alertIndex] }
              </Alert>
              <Form.Label>
                  <Button
                    onClick={this.handleClick}
                    as="input"
                    type="submit"
                    value='Lookup'
                    variant="outline-primary"
                    className={"submit-btn "}
                  />
              </Form.Label>
            </Col>
          </Row>
        </Form>
        </Col>
        </Row>
        <Row className="output-view">
          <Col>
            <h4 className="output-display"> { this.state.title } </h4>
          </Col>
        </Row>
      </Container>
    );
  }
}
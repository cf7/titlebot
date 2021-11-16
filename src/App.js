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
    title: "<title>Mock Title</title>",
  });
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayURL: '',
      title: 'Website Title Appears Here',
      alert: false, // true, // default false
      alertVariant: 'danger',
      alertIndex: 0,
    };
    this.suffixes = ['.com','.org','.edu','.net','.ai'];
    this.alertMessages = [ 
      "Please provide a url to a website's homepage",
      "url must have suffix (e.g. '.com')",
      "Website valid but no title found",
    ];
  }

  processURL = (inputURL, suffixes) => {
    let indices = {};
    suffixes.forEach((s) => {
      if (inputURL.includes(s)) {
        indices[inputURL.indexOf(s)] = s;
      }
    });
    if (Object.keys(indices).length > 0) {
      let min = Math.min(...Object.keys(indices))
      let closest = indices[min];
      inputURL = inputURL.split(closest)[0] + closest;
      if (inputURL.includes('https://') || inputURL.includes('http://')) {
        inputURL = inputURL.split('://')[1];
      }
      return 'https://' + inputURL;
    } else {
      return '';
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState({ displayURL: event.target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.displayURL) {
      let url = this.processURL(this.state.displayURL, this.suffixes);
      if (url) {
        axios.post('/lookup', { data: url })
          .then((response) => {
            console.log(response.body);
            if (response.body && response.body.title) {
              this.setState({ 
                title: response.body.title,
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
          alertIndex: 1
        });
      }
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
          <p>To get started, try inputting a url in the text field below and click [Lookup]. This app only works for homepage urls. If given jumbled input, it will search for the first occurence of a valid url if one exists.</p>
          <figure>
            <h6>The following are examples of valid urls:</h6>
            <ul className="valid-inputs">
              <li>https://chatmeter.com (ideal)</li>
              <li>http://chatmeter.com</li>
              <li>chatmeter.com</li>
            </ul>
          </figure>
        </Col>
        <Col>
          <h5>Valid url suffixes: .com | .org | .edu | .net | .ai</h5>
          <p>When given multiple urls, the app will search using the first occurrence of a "complete url," a url substring that is "valid" and ends with a valid suffix (e.g. ".com").</p>
          <figure>
            <h6>The following are examples of invalid urls:</h6>
              <ul className="invalid-inputs">
                <li>https://chatmeter.asdfasdf</li>
                <li>asdfasdf.chatmeter</li>
                <li>.asdfasdfchatmeter.com</li>
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
                      className="submit-btn"
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
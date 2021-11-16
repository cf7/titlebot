import React from 'react';
// import logo from './logo.svg';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './App.css';


import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayURL: '',
      url: '',
      title: 'Title',
      alert: true, // default false
      alertIndex: 0,
    };
    this.alertMessages = [ 
      "Only a single url allowed",
    ];
  }

  handleChange = (event) => {
    event.persist();
    // console.log(event);
    this.setState({ displayURL: event.target.value });
  }

  handleClick = () => {
    // let inputData = this.state.displayURL;

    axios.get('https://ted.com/')
      .then((response) => {
        console.log("submitted");
        console.log((typeof response.data));
        console.log(response.data.match(/(<title.*>).*(<\/title>)/));
        let data1 = response.data.match(/(<title.*>).*(<\/title>)/);
        console.log(data1);
        // let data2 = data1[0].match(/(>).*(<\/)/);
        // console.log(data2);
        let title = data1[0].match(/[>](.*)[<][/]/)[1];
        this.setState({ title: title });
      }).catch((e) => {
        console.error(e);
      });
  }

  render = () => {
    return (
      <Container className="App">
      <Row>
        <h1>Titlebot</h1>
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
              <Alert variant="danger" show={this.state.alert} >
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
            <h4> { this.state.title } </h4>
          </Col>
        </Row>
      </Container>
    );
  }
}
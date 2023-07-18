import React, { useCallback, useState } from "react";
// import logo from './logo.svg';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { alertMessages } from "../lib/constants";

const processURL = (inputURL, suffixes) => {
  let indices = {};
  suffixes.forEach((s) => {
    if (inputURL.includes(s)) {
      indices[inputURL.indexOf(s)] = s;
    }
  });
  if (Object.keys(indices).length > 0) {
    let min = Math.min(...Object.keys(indices));
    let closest = indices[min];
    inputURL = inputURL.split(closest)[0] + closest;
    if (inputURL.includes("https://") || inputURL.includes("http://")) {
      inputURL = inputURL.split("://")[1];
    }
    return "https://" + inputURL;
  } else {
    return "";
  }
};

export const Main = () => {
  const [displayURL, setDisplayURL] = useState<string>(null);
  const [title, setTitle] = useState<string>("Website Title Appears Here");
  const [error, setError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<string>("danger");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    (event) => {
      setDisplayURL(event?.target?.value);
    },
    [setDisplayURL]
  );

  const handleClick = useCallback((event) => {
    // event.preventDefault();
    // setState({ loading: true });
    // if (state.displayURL) {
    //   let url = processURL(state.displayURL, suffixes);
    //   if (url) {
    //     axios
    //       .post("/lookup", { data: url }, { timeout: 10000 })
    //       .then((response) => {
    //         if (response.data && response.data.title) {
    //           setState({
    //             title: response.data.title,
    //             alert: false,
    //             loading: false,
    //           });
    //         } else {
    //           setState({
    //             alert: true,
    //             alertVariant: "warning",
    //             alertIndex: 2,
    //             loading: false,
    //           });
    //         }
    //       })
    //       .catch((e) => {
    //         console.log(e.code);
    //         console.log(e.message);
    //         console.log(e.stack);
    //         setState({
    //           alert: true,
    //           alertVariant: "info",
    //           alertIndex: 3,
    //           loading: false,
    //         });
    //       });
    //   } else {
    //     setState({
    //       alert: true,
    //       alertVariant: "danger",
    //       alertIndex: 1,
    //       loading: false,
    //     });
    //   }
    // } else {
    //   setState({
    //     alert: true,
    //     alertVariant: "danger",
    //     alertIndex: 0,
    //     loading: false,
    //   });
    // }
  }, []);

  return (
    <Container className="App">
      <Row>
        <h1>Titlebot</h1>
      </Row>
      <Row className="description">
        <Col>
          <h5>Welcome to Titlebot!</h5>
          <p>
            To get started, try inputting a url in the text field below and
            click [Lookup]. This app only works for homepage urls. If given
            jumbled input, it will search for the first occurence of a valid url
            if one exists.
          </p>
          <figure>
            <h6>The following are examples of valid urls:</h6>
            <ul className="valid-inputs">
              <li>https://example.com (ideal)</li>
              <li>http://example.com</li>
              <li>example.com</li>
            </ul>
          </figure>
        </Col>
        <Col>
          <h5>Valid url suffixes: .com | .org | .edu | .net | .ai | .io</h5>
          <p>
            When given multiple urls, the app will search using the first
            occurrence of a "basic url," a url substring that is "valid" and
            ends with a valid suffix (e.g. ".com").
          </p>
          <figure>
            <h6>The following are examples of invalid urls:</h6>
            <ul className="invalid-inputs">
              <li>https://example.asdfasdf</li>
              <li>asdfasdf.example</li>
              <li>.asdfasdfexample.com</li>
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
                  onChange={handleChange}
                  value={displayURL}
                ></Form.Control>
                <Alert variant={errorType} show={error}>
                  {alertMessages[0]}
                </Alert>
                <Form.Label>
                  <Button
                    onClick={handleClick}
                    as="input"
                    type="submit"
                    disabled={loading}
                    value={loading ? "Loading..." : "Lookup"}
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
          <h4 className="output-display"> {title} </h4>
        </Col>
      </Row>
    </Container>
  );
};

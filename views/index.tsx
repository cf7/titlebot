import React, { useCallback, useState } from "react";
// import logo from './logo.svg';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { alertMessages, suffixes } from "../lib/constants";
import { InputForm } from "./components/InputForm";
import axios from "axios";

const processURL = (inputURL: string): string => {
  let index = 0;
  for (const s of suffixes) {
    if (inputURL?.includes(s)) {
      index = inputURL?.indexOf(s);
      break;
    }
  }
  console.log(index);

  let closest = inputURL?.substring(index);
  console.log(closest);
  let finalURL = inputURL.split(closest)[0] + closest;
  console.log(finalURL);
  if (finalURL.includes("https://") || finalURL.includes("http://")) {
    finalURL = finalURL.split("://")[1];
    return "https://" + finalURL;
  } else {
    return "";
  }
};

/*
  TODO:
  - CORS won't allow pulling html from external origins
  - i.e. can't ping a website from a script that isn't from
  - the same origin as the site being pinged ("Same Origin Policy")
  - need to serve up Axios from a backend node server and make the request from there
  (axios can be used frontend or backend)
*/

export const Main = () => {
  const [displayURL, setDisplayURL] = useState<string>("");
  const [title, setTitle] = useState<string>("Website Title Appears Here");
  const [alert, setAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<string>("danger");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (!displayURL) return;
    setLoading(true);
    let url = processURL(displayURL);
    if (url) {
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          /*
          if (req.body && req.body.data) {
    axios.get(req.body.data)
      .then((response) => {
        // yes, I could have used something like Cheerio, but I have fun with regexes.
        if (response.data) {
          let tag = response.data.match(/(<title.*>).*(<\/title>)/)[0];
          let title = tag.match(/(?:<title.*>)(.*)(?:<\/title>)/)[1];
          if (response.data && response.data.title) {
            console.log("here");
          }
          */
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setLoading(false);
    }
    // setState({
    //   alert: true,
    //   alertVariant: "danger",
    //   alertIndex: 0,
    //   loading: false,
    // });
  }, [displayURL, setLoading]);

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
          <InputForm
            alert={alert}
            alertVariant={alertVariant}
            loading={loading}
            displayURL={displayURL}
            setDisplayURL={setDisplayURL}
            handleClick={handleClick}
          />
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

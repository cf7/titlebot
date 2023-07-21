import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputForm } from "./components/InputForm";
import { processURL } from "../lib/utils/methods";
import { ALERT_INFO_MAP, SUFFIXES } from "../lib/constants";

import axios from "axios";
import { InvalidExamples, ValidExamples } from "./components/Examples";
import { ValidSuffixes, WelcomeInstructions } from "./components/Instructions";

export const Main = () => {
  const [displayURL, setDisplayURL] = useState<string>("");
  const [title, setTitle] = useState<string>("Website Title Appears Here");
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // hide alert after 4 seconds
    if (!!Object.keys(alertInfo || {})?.length) {
      setTimeout(() => {
        setAlertInfo(null);
      }, 4000);
    }
  }, [alertInfo]);

  const handleClick = useCallback(() => {
    if (!displayURL) {
      setAlertInfo(ALERT_INFO_MAP?.invalid_url);
      return;
    }

    setLoading(true);

    let url = processURL(displayURL, SUFFIXES);
    console.log("url: ", url);
    if (!url) {
      setAlertInfo(ALERT_INFO_MAP?.invalid_url);
      setLoading(false);
      return;
    }

    if (process.env.NEXT_PUBLIC_API_BASE_PATH) {
      axios
        .request({
          url: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/titles?url=${url}`,
          method: "GET",
        })
        .then((response) => {
          const { data } = response;
          if (data) {
            setTitle(data);
          } else {
            setAlertInfo(ALERT_INFO_MAP?.no_title_found);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setAlertInfo(ALERT_INFO_MAP?.server_error);
          setLoading(false);
        });
    }
  }, [displayURL, setTitle, setLoading]);

  return (
    <Container className="App">
      <Row>
        <h1>Titlebot</h1>
      </Row>
      <Row className="description">
        <Col className="instructions">
          <WelcomeInstructions />
          <div className="horizontal-line"></div>
          <ValidSuffixes />
        </Col>
        <Col className="examples">
          <ValidExamples />
          <InvalidExamples />
        </Col>
      </Row>
      <Row className="form-view">
        <Col>
          <InputForm
            alertInfo={alertInfo}
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

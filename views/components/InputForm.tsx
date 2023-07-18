import { Form, Row, Col, Alert, Button } from "react-bootstrap";
import { alertMessages } from "../../lib/constants";

export const InputForm = ({
  displayURL,
  setDisplayURL,
  alertVariant,
  alert,
  handleClick,
  loading,
}: {
  displayURL: string;
  setDisplayURL: React.Dispatch<React.SetStateAction<string>>;
  alertVariant: string;
  alert: boolean;
  handleClick: () => void;
  loading: boolean;
}) => {
  return (
    <Form className="input-form">
      <Row>
        <Col>
          <Form.Control
            as="input"
            value={displayURL}
            onChange={(event) => setDisplayURL(event?.target?.value)}
            // onKeyDown={(event) => {
            //   if (event?.char === 13) {
            //     console.log("here: ", event);
            //   }
            // }}
          />
          <Alert variant={alertVariant} show={alert}>
            {alertMessages[0]}
          </Alert>
          <Form.Label>
            <Button
              onClick={handleClick}
              as="input"
              disabled={loading}
              value={loading ? "Loading..." : "Lookup"}
              variant="outline-primary"
              className="submit-btn"
            />
          </Form.Label>
        </Col>
      </Row>
    </Form>
  );
};

import { Form, Row, Col, Alert, Button } from "react-bootstrap";

export const InputForm = ({
  displayURL,
  setDisplayURL,
  alertInfo,
  handleClick,
  loading,
}: {
  displayURL: string;
  setDisplayURL: React.Dispatch<React.SetStateAction<string>>;
  alertInfo: AlertInfo;
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
          />
          <Alert
            variant={alertInfo?.type}
            show={!!Object.keys(alertInfo || {})?.length}
          >
            {alertInfo?.message}
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

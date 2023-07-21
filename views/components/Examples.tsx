import { OverlayTrigger, Tooltip } from "react-bootstrap";

const validURLTooltip = (
  <Tooltip id="valid-url-tooltip">
    Still valid because valid url is appended
  </Tooltip>
);

export const ValidExamples = () => {
  return (
    <>
      <div>
        <figure>
          <h6>The following are examples of valid urls:</h6>
          <ul className="valid-inputs">
            <li>https://example.com (ideal)</li>
            <OverlayTrigger placement="bottom" overlay={validURLTooltip}>
              <li>123joisjdf--123 798=98sdf89qwehttps://example.ai</li>
            </OverlayTrigger>
          </ul>
        </figure>
      </div>
    </>
  );
};

export const InvalidExamples = () => {
  return (
    <>
      <div>
        <figure>
          <h6>The following are examples of invalid urls:</h6>
          <ul className="invalid-inputs">
            <li>https://example.asdfasdf</li>
            <li>asdfasdf.example</li>
            <li>.asdfasdfexample.com</li>
            <li>example.com</li>
            <li>https://example.com/account/lists?ids=[1,2,3]</li>
          </ul>
        </figure>
      </div>
    </>
  );
};

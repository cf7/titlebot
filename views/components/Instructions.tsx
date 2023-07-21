import { SUFFIXES } from "../../lib/constants";

export const WelcomeInstructions = () => {
  return (
    <>
      <div className="welcome-instructions">
        <h5>Welcome to Titlebot!</h5>
        <p>
          To get started, try inputting a url in the text field below and click
          [Lookup].{" "}
          <strong>
            This app only works for homepage urls, and only urls that use HTTPS.
          </strong>{" "}
          If given jumbled input, it will search for the first occurence of a
          valid url.
        </p>
      </div>
    </>
  );
};

export const ValidSuffixes = () => {
  return (
    <>
      <div className="suffix-instructions">
        <h5>Valid url suffixes: {SUFFIXES?.join(" | ")}</h5>
        <p>
          When given multiple urls, the app will search using the first
          occurrence of a "basic home page url" a url substring that starts with
          "https://" and ends with a valid suffix (e.g. ".com").
        </p>
      </div>
    </>
  );
};

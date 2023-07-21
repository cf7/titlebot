export const SUFFIXES = [".com", ".org", ".edu", ".net", ".ai", ".io", ".app"];

export const ALERT_INFO_MAP = {
  invalid_url: {
    message: "Please provide a valid url to a website's homepage",
    type: "danger",
  },
  no_title_found: {
    message: "Website valid but no title found",
    type: "warning",
  },
  server_error: {
    message: "An issue occurred with the server",
    type: "danger",
  },
};

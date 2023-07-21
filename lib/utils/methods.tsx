import { SUFFIXES } from "../constants";

/*
    splits a string into substrings
    delimited by valid url suffixes
*/
const splitByURLSuffixes = (url: string): string[] => {
  const suffixes = SUFFIXES?.join("|");
  const suffixPattern = `(https:\/\/|${suffixes})`;
  const suffixRegex = new RegExp(suffixPattern);
  const substrings = url?.split(suffixRegex);
  return substrings;
};

/*
    finds the first occurrence of a "valid" url in a string
    using given suffixes
*/
export const processURL = (inputURL: string, suffixes: string[]): string => {
  const substrings = splitByURLSuffixes(inputURL);

  let finalURL = null;

  for (let i = 0; i < substrings?.length; i++) {
    if (i > 0 && SUFFIXES.includes(substrings?.[i]) && substrings?.[i - 1]) {
      let urlBody = substrings?.[i - 1];
      const suffix = substrings?.[i];
      if (urlBody?.startsWith("https://")) {
        // url is valid
        finalURL = urlBody + suffix;
      } else {
        // for case where valid url is prepended by gibberish
        if (i > 1 && substrings?.[i - 2]?.startsWith("https://")) {
          // url is valid
          finalURL = substrings?.[i - 2] + urlBody + suffix;
        }
      }
    }
  }

  return finalURL;
};

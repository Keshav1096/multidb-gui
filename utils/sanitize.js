let string = require("string-sanitizer");

const sanitize = (text) => {
  return string.sanitize(text);
};

module.exports = { sanitize };

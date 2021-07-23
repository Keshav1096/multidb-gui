const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = (text) => {
  return bcrypt.hash(text, saltRounds).then((hash) => hash);
};

const validate = (text, hash) => {
  return bcrypt.compare(text, hash).then((value) => value);
};

module.exports = { hash, validate };

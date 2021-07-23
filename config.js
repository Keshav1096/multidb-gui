require("dotenv").config();
let config = {
  db_uri:
    process.env.NODE_ENV === "development" ? process.env.db_uri : "redis_port",
};

module.exports = config;

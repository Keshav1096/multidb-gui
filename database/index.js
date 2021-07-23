const config = require("../config");
const Redis = require("ioredis");
const redis = new Redis(config.db_uri);

module.exports = {
  set: (key, value) => {
    return new Promise((resolve, reject) => {
      if (!key || !value) return reject();
      value = typeof value !== "string" ? JSON.stringify(value) : value;
      redis
        .set(key, value)
        .then((data) => {
          console.log(`[REDIS] ${data}`);
          return resolve(data);
        })
        .catch((err) => {
          console.log(`[REDIS] ${err}`);
          return reject(err);
        });
    });
  },
  get: (key) => {
    return new Promise((resolve, reject) => {
      redis
        .get(key)
        .then((value) => (value ? resolve(value) : reject()))
        .catch((err) => reject(err));
    });
  },
  del: (key) => {
    return new Promise((resolve, reject) => {
      try {
        redis.del(key);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  },
};

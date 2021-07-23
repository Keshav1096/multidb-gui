const Redis = require("../database");

module.exports = (sessionId) => {
  return new Promise(async (resolve, reject) => {
    let activeConnections = await Redis.get("activeConnections")
      .then(JSON.parse)
      .catch(() => []);

    let sessionUri = await Redis.get(sessionId).catch(() => null);

    if (!sessionUri) return reject({ err: "session not found" });
    if (!activeConnections.includes(sessionUri))
      return reject({ err: "no active connection" });
    return resolve(sessionUri);
  });
};

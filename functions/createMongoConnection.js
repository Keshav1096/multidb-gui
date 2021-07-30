const Redis = require("../database");
const _ = require("lodash");

const addConnection = (uri) => {
  return new Promise(async (resolve, reject) => {
    if (!uri || !uri.startsWith("mongodb://")) return reject("Invalid uri");

    let sessionId = new Date().getTime();
    let activeConnections = await Redis.get("activeConnections")
      .then(JSON.parse)
      .catch(() => []);

    if (activeConnections.length > 0) {
      let isActive = _.indexOf(activeConnections, uri);

      if (isActive !== -1) {
        return reject({ err: "Instance already active" });
      }
    }
    // let connectionDetails = { sessionId, uri };
    let connectionDetails = await Redis.get("connectionDetails")
      .then(JSON.parse)
      .catch((err) => []);
    connectionDetails.push({ sessionId, uri });
    activeConnections.push(uri);
    console.log(activeConnections);
    await Redis.set("connectionDetails", connectionDetails).catch((err) =>
      reject(err)
    );
    await Redis.set("activeConnections", activeConnections).catch((err) =>
      reject(err)
    );
    await Redis.set(sessionId, uri).catch((err) => reject(err));
    return resolve({ sessionId, uri });
  });
};
module.exports = { addConnection };

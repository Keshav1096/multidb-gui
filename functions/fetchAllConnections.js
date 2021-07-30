const Redis = require("../database");

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let activeConnections = await Redis.get("activeConnections")
      .then(JSON.parse)
      .catch(() => []);

    let connectionDetails = await Redis.get("connectionDetails")
      .then(JSON.parse)
      .catch(() => []);
    // if (activeConnections.length === 0)
    //   return reject({ err: "No active connections" });
    // console.log(activeConnections);
    return resolve(connectionDetails);
  });
};

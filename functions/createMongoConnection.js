const Redis = require("../database");
const _ = require("lodash");

// function connect(uri) {
//   return new Promise((resolve, reject) => {
//     const mongoose = require("mongoose");
//     let options = { useUnifiedTopology: true, useNewUrlParser: true };
//     let conn = mongoose.createConnection(uri, options);

//     conn.on("disconnected", () => {
//       mongoose.connect(uri);
//     });

//     conn.on("error", (err) => {
//       reject(err);
//     });

//     conn.on("open", () => {
//       console.log("Mongodb connected");
//       resolve();
//     });
//   });
// }

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
    let connectionDetails = { sessionId, uri };
    activeConnections.push(uri);
    console.log(activeConnections);
    await Redis.set("activeConnections", activeConnections).catch((err) =>
      reject(err)
    );
    await Redis.set(sessionId, uri).catch((err) => reject(err));
    return resolve(connectionDetails);
  });
};
module.exports = { addConnection };

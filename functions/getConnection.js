const { MongoClient } = require("mongodb");
const fetchUri = require("./fetchUri");

module.exports = (sessionId) => {
  return new Promise(async (resolve, reject) => {
    let uri = await fetchUri(sessionId).catch((err) => reject(err));
    if (!uri) return reject({ err: "uri not found" });

    const client = new MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    try {
      await client.connect();

      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");

      return resolve(client);
    } catch (err) {
      return reject(err);
    }
  });
};

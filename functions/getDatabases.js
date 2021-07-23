const getConnection = require("./getConnection");
const fetchUri = require("./fetchUri");
const { MongoClient } = require("mongodb");

const getAllDB = (sessionId) => {
  return new Promise(async (resolve, reject) => {
    let uri = await fetchUri(sessionId);
    let mongodb = new MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await mongodb.connect();
    const adminDb = mongodb.db("admin").admin();
    adminDb
      .listDatabases()
      .then((dbs) => {
        return resolve(dbs);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
};
module.exports = { getAllDB };

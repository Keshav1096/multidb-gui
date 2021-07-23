const getConnection = require("./getConnection");
const fetchUri = require("./fetchUri");


const getCollectionsByDB = (sessionId, db) => {
  return new Promise(async (resolve, reject) => {
    let uri = await fetchUri(sessionId).catch((err) => null);
    if (!uri) return reject({ err: "uri not found" });

    let { conn } = await getConnection(uri, db).catch(() => null);
    if (!conn) return reject({ err: "error in connecting to mongodb" });

    conn.db.listCollections().toArray(function (err, names) {
      console.log("list coll");
      console.log(names);
      return resolve(names);
    });
  });
};
module.exports = { getCollectionsByDB };

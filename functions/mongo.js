// const fetchUri = require("./fetchUri");
// const { MongoClient } = require("mongodb");
const getConnection = require("./getConnection");
const _ = require("lodash");

const getAllDB = (sessionId) => {
  return new Promise(async (resolve, reject) => {
    // let uri = await fetchUri(sessionId);
    let conn = await getConnection(sessionId).catch((err) => reject(err));

    const adminDb = conn.db("admin").admin();
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

const getCollectionsByDB = (sessionId, db) => {
  return new Promise(async (resolve, reject) => {
    // let uri = await fetchUri(sessionId).catch((err) => null);
    // if (!uri) return reject({ err: "uri not found" });

    let conn = await getConnection(sessionId).catch(() => null);
    if (!conn) return reject({ err: "error in connecting to mongodb" });

    conn
      .db(db)
      .listCollections()
      .toArray(function (err, names) {
        console.log("list coll");
        console.log(names);
        return resolve(names);
      });
  });
};

const getDocumentsByColl = (sessionId, db, collection) => {
  return new Promise(async (resolve, reject) => {
    // let uri = await fetchUri(sessionId).catch((err) => null);
    // if (!uri) return reject({ err: "uri not found" });

    let client = await getConnection(sessionId).catch(() => null);
    if (!client) return reject({ err: "error in connecting to mongodb" });

    let conn = client.db(db).collection(collection);
    let data = await conn
      .find()
      .toArray()
      .catch((err) => console.error(err));

    await client.close();
    return resolve(data);
  });
};

const addDocumentToColl = (sessionId, db, collection, document) => {
  return new Promise(async (resolve, reject) => {
    let client = await getConnection(sessionId).catch(() => null);
    if (!client) return reject({ err: "error in connecting to mongodb" });
    try {
      document = typeof document !== "object" ? JSON.parse(document) : document;
    } catch (e) {
      //do nothing
    }
    let conn = client.db(db).collection(collection);
    let result = await conn.insertOne(document).catch((err) => false);

    if (!result) return reject({ err: "error adding doc to collection" });
    return resolve({ insertedId: result.insertedId });
  });
};

const searchByQuery = (sessionId, db, collection, query, limit = null) => {
  return new Promise(async (resolve, reject) => {
    let client = await getConnection(sessionId).catch((err) => reject(err));
    let conn = client.db(db).collection(collection);
    if (!(query instanceof Object)) return reject();

    let result = await conn
      .find(query)
      .toArray()
      .catch((err) => reject(err));
    if (limit) {
      result = _.slice(result, 0, limit);
    }
    return resolve(result);
  });
};
module.exports = {
  getAllDB,
  getCollectionsByDB,
  getDocumentsByColl,
  addDocumentToColl,
  searchByQuery,
};

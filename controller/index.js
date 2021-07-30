// Require methods here
const { addConnection } = require("../functions/createMongoConnection");
const fetchAllConnections = require("../functions/fetchAllConnections");
const {
  getDocumentsByColl,
  getCollectionsByDB,
  getAllDB,
  addDocumentToColl,
  searchByQuery,
} = require("../functions/mongo");

const addMongoConnection = (req, res) => {
  let { body } = req;
  let { uri } = body;
  if (!uri)
    return res.status(400).json({ success: false, err: "Invalid params" });
  addConnection(uri)
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(200).json({ success: false, err: err });
    });
};

const getDB = (req, res) => {
  let { sessionId } = req.query;
  if (!sessionId)
    return res.status(400).json({ success: false, err: "Inavlid params" });
  getAllDB(sessionId)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(200).json({ success: false, err: err });
    });
};

const getCollections = (req, res) => {
  let { sessionId = null, db = null } = req.query;
  if (!sessionId || !db)
    return res.status(400).json({ success: false, err: "Inavlid params" });
  getCollectionsByDB(sessionId, db).then((collections) => {
    return res.status(200).json({ success: true, data: collections });
  });
};
const getDocuments = (req, res) => {
  let { sessionId = null, db = null, collection = null } = req.query;
  if (!sessionId || !db || !collection)
    return res.status(400).json({ success: false, err: "Inavlid params" });

  getDocumentsByColl(sessionId, db, collection)
    .then((docs) => {
      return res.status(200).json({ success: true, data: docs });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, err: err });
    });
};
const addDocument = (req, res) => {
  let { sessionId = null, db = null, collection = null } = req.query;
  let { document } = req.body;
  console.log(document);
  if (!document)
    return res.status(400).json({ success: false, err: "Err Inavlid params" });
  if (!sessionId || !db || !collection)
    return res.status(400).json({ success: false, err: "Inavlid params" });

  addDocumentToColl(sessionId, db, collection, document)
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => res.status(500).json({ success: false, err }));
};
const searchCollByQuery = (req, res) => {
  let { sessionId = null, db = null, collection = null } = req.query;
  let { query, limit = null } = req.body;

  if (!query)
    return res.status(400).json({ success: false, err: "Err Inavlid params" });
  if (!sessionId || !db || !collection)
    return res.status(400).json({ success: false, err: "Inavlid params" });

  searchByQuery(sessionId, db, collection, query, limit)
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => res.status(500).json({ success: false, err }));
};
const getAllConnections = (req, res) => {
  fetchAllConnections()
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => res.status(500).json({ success: false, err }));
};

module.exports = {
  addMongoConnection,
  addDocument,
  getDB,
  getCollections,
  getDocuments,
  searchCollByQuery,
  getAllConnections
};

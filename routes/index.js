const express = require("express");
const router = express();

// define all your imports in here
const {
  addMongoConnection,
  getDB,
  getCollections,
  getDocuments,
  addDocument,
  searchCollByQuery,
  getAllConnections,
} = require("../controller");
const { searchByQuery } = require("../functions/mongo");

//add a new mongo connection
router.post("/mongo/create", addMongoConnection);

//create a new document
router.post("/mongo/create/document", addDocument);

//get all db
router.get("/mongo/db", getDB);

//get all collections
router.get("/mongo/collections", getCollections);

//get all documents of collection
router.get("/mongo/documents", getDocuments);

//search coll by query
router.post("/mongo/search/query", searchCollByQuery);

//get all connections
router.get("/mongo/connections", getAllConnections);

module.exports = router;

const getConnection = require("./getConnection");
const fetchUri = require("./fetchUri");
const mongoose = require("mongoose");

const getDocumentsByColl = (sessionId, db, collection) => {
  return new Promise(async (resolve, reject) => {
    let uri = await fetchUri(sessionId).catch((err) => null);
    if (!uri) return reject({ err: "uri not found" });

    let client = await getConnection(uri).catch(() => null);
    if (!client) return reject({ err: "error in connecting to mongodb" });
    client.db(db).collections(function (err, coll) {
      if (err) console.log(err);
      console.log(coll);
    });

    let conn = client.db(db).collection(collection);
    let data = await conn
      .find()
      .toArray()
      .catch((err) => console.error(err));

    await client.close();
    return resolve(data);
    // const Model = mongoose.model(collection, {});
    // Model.find({})
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });
};
module.exports = { getDocumentsByColl };

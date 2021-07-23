// module.exports = (uri, db) => {
//   return new Promise((resolve, reject) => {
//     const mongoose = require("mongoose");
//     const Admin = mongoose.mongo.Admin;
//     let options = db
//       ? { useUnifiedTopology: true, useNewUrlParser: true, dbName: db }
//       : { useUnifiedTopology: true, useNewUrlParser: true };
//     let conn = mongoose.createConnection(uri, options);

//     conn.on("disconnected", () => {
//       mongoose.connect(uri);
//     });

//     conn.on("error", (err) => {
//       reject(err);
//     });

//     conn.on("open", () => {
//       // console.log(mongoose.connections[0].collections);
//       console.log(`Mongodb connected ${uri}/${db ? db : ""}`);
//       resolve({ conn, Admin, mongoose });
//     });
//   });
// };
const { MongoClient } = require("mongodb");
const fetchUri = require("./fetchUri");
module.exports = (sessionId) => {
  return new Promise(async (resolve, reject) => {
    //fetch uri from session
    let uri = await fetchUri(sessionId).catch((err) => null);
    if (!uri) return reject({ err: "uri not found" });
    // Create a new MongoClient
    const client = new MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    try {
      // Connect the client to the server
      await client.connect();

      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
      // let collection = client.db("cryptodb").collection("users");
      // let data = await collection
      //   .find()
      //   .toArray()
      //   .catch((err) => console.error(err));
      // console.log(data);
      return resolve(client);
    } catch (err) {
      return reject(err);
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  });
};

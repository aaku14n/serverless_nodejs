const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

module.exports.main = (event, context, callback) => {
  const id = "3d368560-9d2a-11e7-aed7-a5109e79613d";
  if (id) {
    MongoClient.connect(process.env.atlas_connection_uri, (err, db) => {
      assert.equal(null, err);
      try {
        db.collection("Cluster0").findOne({ user_id: id }, (error, result) => {
          if (error) {
            callback(null, { statusCode: 500, body: JSON.stringify(error) });
          } else if (result !== null) {
            callback(null, { statusCode: 200, result });
            db.close();
          } else {
            callback(null, { statusCode: 200, body: "User dose not exist" });
          }
        });
        db.close();
      } catch (err) {
        callback(err);
      }
    });
  }
};

const uuid = require("uuid");
const dateFormat = require("dateformat");
const assert = require("assert");
const now = new Date();
const MongoClient = require("mongodb").MongoClient;

module.exports.delete = (event, context, callback) => {
  const id = event.pathParameters.id;
  if (id) {
    MongoClient.connect(process.env.atlas_connection_uri, (err, db) => {
      assert.equal(null, err);
      try {
        db.collection("Cluster0").findOne({ user_id: id }, (error, result) => {
          if (error) {
            callback(null, { statusCode: 200, body: JSON.stringify(error) });
          } else if (result !== null) {
            db.collection("Cluster0").remove({ user_id: id }, (err, db) => {
              assert.equal(null, err);
              callback(null, { statusCode: 200, body: "Success" });
            });
          } else {
            callback(null, {
              statusCode: 200,
              body: "No user exist with this email id"
            });
          }
          db.close();
        });
      } catch (err) {
        callback(err);
      }
    });
  }
};

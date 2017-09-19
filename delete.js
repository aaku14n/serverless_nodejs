const uuid = require("uuid");
const dateFormat = require("dateformat");
const assert = require("assert");
const now = new Date();
const MongoClient = require("mongodb").MongoClient;

module.exports.main = (event, context, callback) => {
  let id = event.id;
  id = "e337cda0-9d27-11e7-8fb7-77e3d38b870c";
  console.log(event);
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
            db.close();
          }
          db.close();
        });
      } catch (err) {
        callback(err);
      }
    });
  }
};

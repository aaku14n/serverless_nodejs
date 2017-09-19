import uuid from "uuid";
import AWS from "aws-sdk";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    Item: {
      userId: 123345,
      noteId: uuid.v1(),
      content: "sdfadsf",
      attachment: "attechment",
      createdAt: new Date().getTime()
    }
  };

  context.callbackWaitsForEmptyEventLoop = false;
  MongoClient.connect(
    process.env.atlas_connection_uri,
    { native_parser: true },
    (err, db) => {
      assert.equal(null, err);
      try {
        db
          .collection("Cluster0")
          .findOne(
            { email_id: "aaakarsh@gmaiil.com" },
            { email_id: 1, _id: 0 },
            (err, result) => {
              if (err) {
                callback(null, { statusCode: 500, body: JSON.stringify(err) });
              } else if (result !== null) {
                callback(null, {
                  statusCode: 500,
                  body: "email id is already register please try to login"
                });
                db.close();
              }
            }
          );
      } catch (err) {
        callback(err);
      }
    }
  );
}

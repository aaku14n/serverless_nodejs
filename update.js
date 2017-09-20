"use strict";
const uuid = require("uuid");
// import AWS from "aws-sdk";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
module.exports.update = (event, context, callback) => {
  const User = {
    first_name: event.first_name,
    last_name: event.last_name,
    email_id: event.email_id,
    contact_number: event.contact_number,
    image_url: event.image_url,
    test_flag: event.test_flag,
    password: event.password,
    description: event.description,
    label: event.label,
    response: event.response
  };
  if (event.id) {
    MongoClient.connect(
      process.env.atlas_connection_uri,
      { native_parser: true },
      (err, db) => {
        assert.equal(null, err);
        try {
          db
            .collection("Cluster0")
            .update(
              { user_id: event.id },
              User,
              { upsert: true },
              (error, user) => {
                if (err)
                  callback(null, {
                    statusCode: 500,
                    body: JSON.stringify(error)
                  });
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify({ user, status: "Success" })
                });
                db.close();
              }
            );
        } catch (err) {
          callback(null, {
            statusCode: 500,
            body: JSON.stringify({ data: "Probles in data base" })
          });
        }
      }
    );
  }
};

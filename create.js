"use strict";
const uuid = require("uuid");
// import AWS from "aws-sdk";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
module.exports.create = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const temp = {
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

  const data = temp;
  var User = {
    user_id: uuid.v1(),
    first_name: data.first_name,
    last_name: data.last_name,
    email_id: data.email_id,
    contact_number: data.contact_number,
    image_url: data.image_url,
    test_flag: false,
    password: data.password,
    test: [
      {
        test_id: uuid.v1(),
        questions: [
          {
            question_id: uuid.v1(),
            description: data.description,
            label: data.label,
            response: data.response
          }
        ]
      }
    ]
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
          .update(
            { user_id: User.user_id },
            User,
            { upsert: true },
            (error, user) => {
              if (err)
                callback(null, {
                  statusCode: 500,
                  body: JSON.stringify(error)
                });
              let data = { id: User.user_id, User: User, tokenId: "" };
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(data)
              });
              db.close();
            }
          );
      } catch (err) {
        callback(null,{statusCode: 500,body : JSON.stringify({data:"Probles in data base"})});
      }
    }
  );
};

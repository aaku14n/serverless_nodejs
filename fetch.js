const uuid = require("uuid");
// import AWS from "aws-sdk";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
module.exports.Read = (event, context, callback) => {
  const id_2 = event.pathPatameters.id;
  console.log(id_2);
};

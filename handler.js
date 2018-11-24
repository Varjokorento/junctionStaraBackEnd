'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const NewsModel = require('./model/News.js');
const TrafficModel = require('./model/Traffic.js');
const CustomerModel = require('./model/CustomerReview');
const mongoString = require('./env/keys');
mongoose.Promise = Promise;


const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};


const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
} 


module.exports.getAllNews = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    NewsModel
      .find()
      .then(comments => callback(null, {
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
         statusCode: 200, 
         body: JSON.stringify(comments)}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.getTraffic = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    TrafficModel
      .find()
      .then(traffic => callback(null, {
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
         statusCode: 200, 
         body: JSON.stringify(traffic)}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.postTraffic = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const traffic = new TrafficModel({
    congestion: data.congestion,
    throughput: data.throughput
  });

  dbConnectAndExecute(mongoString, () => (
    traffic.save()
      .then((res) => callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.postReview = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const review = new CustomerModel({
    question1: data.question1,
    question2: data.question2,
    question3: data.question3,
    question4: data.question4
  });

  dbConnectAndExecute(mongoString, () => (
    review.save()
      .then((res) => callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.getAllReviews = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    CustomerModel
      .find()
      .then(reviews => callback(null, {
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
         statusCode: 200, 
         body: JSON.stringify(reviews)}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}


module.exports.postNews = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const news = new NewsModel({
    title: data.title,
    text: data.text,
    url: data.url
  });

  dbConnectAndExecute(mongoString, () => (
    news.save()
      .then((res) => callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.getAverageQuestion1 = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    CustomerModel
    .aggregate([
      {$group:{_id: null, average: {$avg: '$question1'}}}
    ])
    .then(result => callback(null, {
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
       statusCode: 200, 
       body: JSON.stringify(result) }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.getAverageQuestion2 = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    CustomerModel
    .aggregate([
      {$group:{_id: null, average: {$avg: '$question2'}}}
    ])
    .then(result => callback(null, {
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
       statusCode: 200, 
       body: JSON.stringify(result) }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.getAverageQuestion3 = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    CustomerModel
    .aggregate([
      {$group:{_id: null, average: {$avg: '$question3'}}}
    ])
    .then(result => callback(null, {
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
       statusCode: 200, 
       body: JSON.stringify(result) }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}





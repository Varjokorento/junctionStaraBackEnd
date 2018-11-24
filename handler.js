'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const NewsModel = require('./model/News.js');
const mongoString = require('./env/keys');
//const mongoString = 
//const mongoString = 'mongodb://kalle:kalle123@ds123372.mlab.com:23372/devconnectorvarjis'; 
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



module.exports.echo = (event, context, cb) => {
  cb({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({})
    });
};     



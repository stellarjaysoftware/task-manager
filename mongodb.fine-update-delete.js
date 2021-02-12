const mongodbFineUpdateDelete = require('mongodb');
const { MongoClient, ObjectID } = mongodbFineUpdateDelete;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log('id',id, id.getTimestamp());

MongoClient.connect(connectionUrl, {
  useNewUrlParser: true
}, (error, client) => {
  if (error) {
    return console.error('unable to connect', error);
  }
  const db = client.db(databaseName);
  // db.collection('users').findOne({_id: ObjectID("60147137bcf2902236246d68")}, (error, result) => {
  //   if (error) return console.error(error);
  //   console.log(result);
  // });
  // db.collection('users').find({age: 41}).toArray((error, result) => {
  //   if (error) return console.error(error);
  //   console.log(result);
  // });
  // db.collection('users').find({age: 41}).count((error, result) => {
  //   if (error) return console.error(error);
  //   console.log(result);
  // });
  // db.collection('tasks').findOne({_id: ObjectID("601473f4ecea632288c0c5e5")}, (error, result) => {
  //   if (error) return console.error(error);
  //   console.log(result);
  // });
  // db.collection('tasks').find({completed: false}).toArray((error, result) => {
  //   if (error) return console.error(error);
  //   console.log(result);
  // });
  // db.collection('users').updateOne({
  //   _id: ObjectID("60146fffd234ec220bdff382")
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.error(error);
  // });
  // db.collection('tasks').updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.error(error);
  // });
  // db.collection('users').deleteMany({
  //   age: 41
  // }).then(result => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.error(error);
  // });
  db.collection('tasks').deleteOne({
    description: "study mongodb"
  }).then(result => {
    console.log(result);
  }).catch((error) => {
    console.error(error);
  });
});


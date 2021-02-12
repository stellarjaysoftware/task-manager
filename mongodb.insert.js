const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log('id',id, id.getTimestamp());

MongoClient.connect(connectionUrl, {
  useNewUrlParser: true
}, (error, client) => {
  if (error) {
    return console.error('unable to connect', error);
  }
  const db = client.db(databaseName);
  db.collection('users').insertOne({
    _id: id,
    name: 'Vikram',
    age: 41
  }, (error, result) => {
    if (error) {
      return console.error('unable to insert', error);
    }
    console.log(result.ops);
  });

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen', age: 28
  //   },
  //   {
  //     name: 'Gunther', age: 4
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.error('unable to insert')
  //   }
  //   console.log(result.ops);
  // });

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'study typescript and react',
  //     completed: true
  //   },
  //   {
  //     description: 'study mongodb',
  //     completed: false
  //   },
  //   {
  //     description: 'apply to classy job',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.error('unable to insert')
  //   }
  //   console.log(result.ops);
  // });

});


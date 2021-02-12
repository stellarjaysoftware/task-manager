const mongoose = require('mongoose');
const validator = require('validator');
const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-api";

const db = mongoose.connect(`${connectionUrl}/${databaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate (value) {
      if (value < 0) {
        throw new Error('Age must be positive number');
      }
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('invalid email');
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('password can not contain "password"');
      }
    }
  }
});

const me = new User({name: 'Scott', email: 'jim@beam.com', password: 'asdfasdf'});

me.save().then(() => {
  console.log(me);
}).catch((error) => {
  console.error(error);
});

// when creating the collection mongoose lower-cases and pluralizes the model name

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const studyMongo = new Task({ description: 'learn mongo', completed: false});
studyMongo.save().then((response)=> {
  console.log(response);
}).catch((error) => {
  console.error(error);
})

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log('mongdb connected');
  } catch (err) {
    console.log(err.message);
    //process should exist if failure occurs
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
var options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      keepAlive: 300000,
      connectTimeoutMS: 30000
    });
    console.log('mongdb connected');
  } catch (err) {
    console.log(err.message);
    //process should exist if failure occurs
    process.exit(1);
  }
};

module.exports = connectDB;

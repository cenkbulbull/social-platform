const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.cmtywyi.mongodb.net/?retryWrites=true&w=majority`);

  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });

  mongoose.Promise = global.Promise;

};
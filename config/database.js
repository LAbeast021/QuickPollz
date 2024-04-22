// var mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true
//   });
// //  ////////////////////// TO CHECK WE ARE CONNECTED AND WHERE WE ARE CONNECTED TO /////////////////////////
// var db = mongoose.connection;

// db.on('connected', function (err) {
//   console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
// });

// // NEW VERSION OF MONGOOSE ALREADY ASSUMES ALL THE FOLLOWIN  }}}}} IF THERE IS AN ERROR CONNECTING TO DATABASE {{{{{{{{{}}}}}}}}}
//   // useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options
//   // . Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true , and useFindAndModify is false .
//   // useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useUnifiedTopology: true

const mongoose = require('mongoose');
const fs = require('fs');
const ca = fs.readFileSync('path/to/ca.pem');

const options = {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    poolSize: 10,
};

mongoose.connect(process.env.DATABASE_URL, options).catch(err => {
    console.error('Connection error:', err);
});

var db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', err => {
    console.error('MongoDB connection error:', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

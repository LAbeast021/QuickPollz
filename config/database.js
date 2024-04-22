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


var mongoose = require('mongoose');

// Connection options for best practice and handling reconnections
const options = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds while trying to connect
    socketTimeoutMS: 45000,        // Close sockets after 45 seconds of inactivity
    family: 4                      // Use IPv4, skip trying IPv6
};

// Connecting to MongoDB
mongoose.connect(process.env.DATABASE_URL, options).catch(err => {
    console.error('Initial MongoDB connection error:', err.message);
});

var db = mongoose.connection;

// Successful connection
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// Connection throws an error
db.on('error', err => {
    console.error(`MongoDB connection error: ${err.message}`);
    // Optionally, you could implement a reconnection strategy here
    mongoose.disconnect();
});

// Connection is disconnected
db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    // Attempt to reconnect every 5 seconds
    setTimeout(() => mongoose.connect(process.env.DATABASE_URL, options), 5000);
});

// Close the Mongoose connection when the app is terminated
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
});

// Optional: Log when the connection is reconnected
db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

// Optional: Log when reconnecting
db.on('reconnecting', () => {
    console.log('MongoDB reconnecting...');
});

const mongoose = require('mongoose');


// Defining the data base
const db = mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  
module.exports = db
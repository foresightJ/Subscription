const mongoose = require('mongoose');


// Defining the data base
const db = mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
module.exports = db
var mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
    
    FirstName: {
    type: Schema.Types.String,
    },
    LastName: {
    type: Schema.Types.String,
    },
    Address: {
    type: Schema.Types.String,
    },
    Number: {
    type: Schema.Types.Number,
    },
    Email: {
    type: Schema.Types.String,
    }
},
   
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

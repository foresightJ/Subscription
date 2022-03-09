var mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
    
    FirstName: {
    type: Schema.Types.String,
    },
    LastName: {
    type: Schema.Types.String,
    },
    Email: {
    type: Schema.Types.String,
    },
    Password: {
    type: Schema.Types.String,
    },
    subscripitons: [
    {
      sub: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
      }
    }
  ]
  },
   
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

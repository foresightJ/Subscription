var mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
    
    firstName: {
    type: Schema.Types.String,
    },
    lastName: {
    type: Schema.Types.String,
    },
    email: {
    type: Schema.Types.String,
    },
    password: {
    type: Schema.Types.String,
    },
    subscriptions: [
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

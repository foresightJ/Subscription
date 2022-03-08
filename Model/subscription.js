const mongoose = require('mongoose');
const {Schema} = mongoose;


const subscriptionsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    cost: {
        type: String,
        require: true
    },
    company: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    nextPayment: {
        type: Object,
        require: true
    },
    previousPayment: [{
        type: Object, 
        required: true
    }], 
},
{
    timestamps: true
  }
)

module.exports = mongoose.model('Subscription', subscriptionsSchema);
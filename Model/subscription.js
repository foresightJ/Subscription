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
    paymentDate: {
        type: Date,
        require: true
    },
    history: [{
        type: Object,
    }], 
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
  }
)

module.exports = mongoose.model('Subscription', subscriptionsSchema);
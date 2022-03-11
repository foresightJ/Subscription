//this is the server controller where i do send data to the back end....
const User = require('../Model/user')
const Subscription = require('../Model/subscription')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const SALT_ROUNDS = 6; 


const postCreateUser = async (req, res, next) => {
    try{
        //CREATE USER
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        const newUser = new User ({
            // id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            
        })
        // //SAVE USER IN THE DB
        const user = await newUser.save()
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
      
        // send a response to the front end
        res.status(200).json(token)
    
    }catch {
      res.status(400).json('Bad Credentials');
    }   
}
// Login a User
const getLogIn = async (req, res) => {
    try {
      const user = await User.find({ email: req.body.email });
      console.log(user)
          // check password. if it's bad throw an error.
          if (!( bcrypt.compare(req.body.password, user.password))) {
              throw new Error()
        }else;{
      // if we got to this line, password is ok. give user a new token.
      const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
      res.json(token)
    }
    } catch {
      res.status(400).json('Bad Credentials');
    }
}





//RETRIVE ALL USER
const getHompage = async(req, res, next) => {
    await User.find().then(users => {
        res.send({users});
    })
    .catch(err => res.status(400).json(err))
}


//RETRIVE A USER BY ID
const getAUserByID = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .populate({
        path: 'subscriptions.sub',
    })
    .exec()
    .then(data => {
        res.send({data})
    })
    .catch(err => res.status(400).json(err))
}



//  GETTING A USER TO EDIT
const getEdit = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .then(data => {
        res.send({data})
    })
    .catch(err => res.status(400).json(err))
}

// POSTING UPDATED USER INFO
const postEdit = (req, res, next) => {
    const id = req.body.id;
    User.findById(id)
    .then(user => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        return user.save()
    })
    .then((user) => {
        // send a response to the front end
        res.status(200).json(user)
    })
    .catch(err => res.status(400).json(err));
}

//DELETING A USER
const postDeleteUser = async (req, res, next) => {
    try{ 
    const userId = req.params.id;
    console.log(userId)
    // // find the user //
    const user = await User.findById(userId)
    user.deleteOne()

    //find all subscriptions with userId
        const SubDel= await Subscription.deleteMany({
            'user': userId
        })
        console.log(SubDel)
    res.status(200).json()
    }catch(err) {
        console.log(err)
        res.status(400).json(err);
      }

}


// SUBSCRIPTIONS

// creating a subscrition
const postCreateSub = async (req, res) => {
    try{
        console.log("post", req.body)
    const userId = req.body.userId
    const newSub = new Subscription ({
        user : userId,
        name: req.body.name,
        cost: req.body.cost,
        company: req.body.company,
        description: req.body.description,
        paymentDate: req.body.paymentDate,
    })
        const resp =  await newSub.save()
        const subId = {sub: resp._id}
        const user = await  User.findById(userId)
      // push the id into the user post array
        user.subscripitons.push(subId)
        const result = await   user.save()
        res.status(200).json(result)
    }catch(err){res.status(400).json(err)}
}

//RETRIVE ALL Subscriptions
const getAllSubscriptions = async(req, res, next) => {
    try{
      const subs =  await Subscription.find()
      .populate('user')
      .exec() 
      res.send({subs});
    }catch(err){res.status(400).json(err)}
}

//RETRIVE A Subscription BY ID
const getSubscriptionByID = async (req, res, next) => {
    try{ 
        const subId = req.params.id;
        const sub = await Subscription.findById(subId)
        const user = await User.findById(sub.user)
        .populate({
            path: 'subscription.sub'
        })
        .exec()
    res.send({user, sub})
   
    }catch(err){res.status(400).json(err)}
}

const postEditSubscriptions = async (req, res, next) => {
    try{

        const id = req.params.id;
        console.log(id)
        const sub = await Subscription.findById(id)  
        sub.name = req.body.name;
        sub.cost =  req.body.cost;
        sub.company =  req.body.company;
        sub.description =  req.body.description;
        sub.paymentDate =  req.body.paymentDate;
        
        const result = await sub.save()
        res.status(200).json(result)

    }catch(err){res.status(400).json(err)}
}

//DELETING A Subscription
const postDeleteSubscription = async (req, res, next) => {
    try{
    const subId = req.params.id;
    let userId = ''

    const sub =  await Subscription.findById(subId)

    userId = sub.user._id
    

    // delete subscription from user's account
    const user = await User.findById(userId)
    const allSubscriptions = user.subscriptions

    console.log(allSubscriptions)
    for(let i=0; i < allSubscriptions.length; i++){
        console.log(allSubscriptions[i])
        if(allSubscriptions[i].sub._id.toString() === subId.toString()){
        //    remove the subscription in user acct
            allSubscriptions.splice(i, 1)
            user.save()
            // delete the subscription
            sub.remove()
            res.status(200)
        }
    }
    }catch(err){res.status(400).json(err)}
}


module.exports = {
    postCreateUser,
    getHompage,
    getAUserByID,
    getEdit,
    postEdit, 
    postDeleteUser,
    getLogIn,

    // subscriptions
    postCreateSub,
    getSubscriptionByID,
    getAllSubscriptions,
    postEditSubscriptions,
    postDeleteSubscription

}
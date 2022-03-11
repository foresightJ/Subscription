//this is the server controller where i do send data to the back end....
const User = require('../Model/user')
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
          // check password. if it's bad throw an error.
          if (!( bcrypt.compare(req.body.password, user.password))) throw new Error();
      // if we got to this line, password is ok. give user a new token.
      const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
      res.json(token)
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
const postDelete = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await User.findByIdAndDelete(id)
    .then(result => {
        console.log(result)
          res.status(200).json(result)
      })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    postCreateUser,
    getHompage,
    getAUserByID,
    getEdit,
    postEdit, 
    postDelete,
    getLogIn,
}
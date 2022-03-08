//this is the server controller where i do send data to the back end....
const User = require('../Model/user')






//Creating A User
const postCreateUser = async (req, res, next) => {
    //get the info from the front-end and send to the db
    //CREATE USER
    const newUser = new User ({
        // id: req.body.id,
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Address: req.body.address,
        Number: req.body.number,
        Email: req.body.email,
    })
    // //SAVE USER IN THE DB
    newUser.save()
    .then(result => {
        // send a response to the front end
        res.status(200).json(result)
    })
    .catch(err => res.status(400).json(err))
        
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
        user.FirstName = req.body.firstName;
        user.LastName = req.body.lastName;
        user.Address = req.body.address;
        user.Number = req.body.number;
        user.Email = req.body.email;
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
    postDelete
}
const Controller = require('../Controller/controller');
const router = require('express').Router()

//get all users
router.get('/', Controller.getHompage)
 
//post new user
router.post('/api', Controller.postCreateUser);

// POST /api/users/login
router.post('/api/user/login', Controller.getLogIn);

//getting a user item by id
router.get('/api/:id', Controller.getAUserByID);

//get user to edit
router.get('/edit/:id', Controller.getEdit);

//post the edited user
router.post('/edit/:id', Controller.postEdit);

//post delete
router.post('/api/:id', Controller.postDeleteUser);



// SUBSCRIPTION Routes

//create new subscrition
router.post('/api/createSub/:id', Controller.postCreateSub);

// get all the subscriptions
router.get('/api/subscriptions', Controller.getAllSubscriptions)

//getting a subscription by id
router.get('/api/subscription/:id', Controller.getSubscriptionByID);

//post edited subscription
router.post('/edit/subscription/:id', Controller.postEditSubscriptions);

//delete a subscription
router.post('/api/removeSub/:id', Controller.postDeleteSubscription
);




module.exports = router;
const express = require('express');
const userRouter = express.Router();
const userModel = require('../public/models/userModel');
// const protectRoute = require('./authHelper');
const req = require('express/lib/request');
const { getUser , getAllUser  , updateUser , deleteUser   } = require('../controller/userController')
const { signup , login , isAuthorised , protectRoute } = require('../controller/authController');

/* Options with the user */
userRouter
    .route(':/id')
    .patch(updateUser)
    .delete(deleteUser)


userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)


/*  Profile Page
 // A user should be logged in to see his profile
// so protected */
userRouter.use(protectRoute)
userRouter
    .route('/userProfile') 
    .get(getUser)

// Middleware for admin specific function
userRouter.use(isAuthorised(['admin']));

userRouter
    .route('')
    .get(getAllUser)

module.exports = userRouter;
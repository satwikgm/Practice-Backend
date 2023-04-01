const express = require('express');
const userRouter = express.Router();
const userModel = require('../public/models/userModel');
const protectRoute = require('./authHelper');
const req = require('express/lib/request');
const { getUsers , postUsers , updateUsers , deleteUsers , getUsersById , setCookies , getCookies } = require('../controller/userController')

userRouter
    .route("/")                 // First parameter in any normal route
    .get(protectRoute , getUsers)    // protectRoute : Can get users only if u are logged in          // Second parameters (Functions) ....
    .post(postUsers)
    .patch(updateUsers)
    .delete(deleteUsers);

    userRouter
        .route("/getCookies")
        .get(getCookies);

    userRouter
        .route("/setCookies")
        .get(setCookies);

userRouter.route("/:id").get(getUsersById);

// All underlying functoins and logic in Conroller folder ( userConroller.js )
 
 
module.exports = userRouter;
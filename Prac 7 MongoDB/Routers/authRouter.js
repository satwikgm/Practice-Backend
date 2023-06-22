const express = require('express');
const authRouter = express.Router();
const userModel = require('../public/models/userModel');
const jwt = require('jsonwebtoken');
// Random secret key stored in backend
const JWT_KEY = require('../../secrets');
const {   login   } = require('../controller/authController');

authRouter
    .route('/signup')
    .get(middleware1 , getSignUp , middleware2)
    .post(postSignUp);

authRouter
    .route('/login')
    .post(login)

function middleware1(req,res,next) {
    console.log('Middleware1 encountered');
    next();
}

function middleware2(req,res) {
    console.log('Middleware2 encountered');
    // next();
    console.log("Middleware 2 ended request response cycle");
    res.sendFile('/public/index.html' , {root : __dirname});
}

// Send HTML files
function getSignUp(req,res,next) {
    console.log('get signup is called');
    next();
    // res.sendFile('/public/index.html' , {root : __dirname});
}

// CRUD Operations : Post => Create => We want to send some data from frontend to backend => create() 
async function postSignUp(req,res) {
    // We received this from frontend
    // Anything received is always stored in the req.body

    // Using frontend without Mongodb
    // let dataObject = req.body;
    // This will get printed on our backend based on the object received from frontend => Create

    // Mongodb data
    let dataObject = req.body;
    let userData = await userModel.create(dataObject);
    // console.log('Backend ->' , userData);
    res.json({
        message : "User signed up" , 
        data : userData
    });
}

module.exports = authRouter;
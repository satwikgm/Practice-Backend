const express = require('express');
const authRouter = express.Router();
const userModel = require('../public/models/userModel');

authRouter
    .route('/signup')
    .get(middleware1 , getSignUp , middleware2)
    .post(postSignUp);

authRouter
    .route('/login')
    .post(loginUser)

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

// email and password will be receivedin req.body
// Based on unique email we will retreive the user
async function loginUser(req,res) {
    try {
        // Will contain email and password
        let data = req.body;
        // Data should have email
        if(data.email)
        {
            // Find user with the email in req body
            let user = await userModel.findOne({email:data.email});
            // if user exists (defined)
            if(user) {
                // Hashed == Normal ?? How to compare??
                // Using bcrypt compare function
                if(user.password == data.password) {
                    // It means that user has logged in
                    // Now we will make a cookie that gives a message of isLoggedIn and sets flag to true
                    // This will be used in protect route , so that access of user's data can be only given
                    // to logged in users.
                    res.cookie('isLoggedIn' , true , {httpOnly : true});
                    return res.json({
                        message: "User logged in",
                        userDetails: data 
                    }) 
                }
                else {
                    return res.json({
                        message: "Incorrect Credentials"
                    })
                }
            }
            else {
                return res.json({
                    message: "User not found"
                })
            }
        }
        else {
            res.json({
                message: "Email field is empty"
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = authRouter;
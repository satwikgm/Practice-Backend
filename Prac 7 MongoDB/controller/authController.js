const userModel = require('../public/models/userModel')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../secrets'); 

// signing up
module.exports.signup = async function signup(req,res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);

        if(user) {
            res.json({
                message : "User signed up",
                data: user
            })
        }
        else {
            res.json({
                message : "Error while signing up"
            })
        }
    } catch (err) {
        res.json({
            message : err.message
        })
    }
}


// Logging in
 // email and password will be receivedin req.body
// Based on unique email we will retreive the user
module.exports.login = async function loginUser(req,res) {
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
                    // // Now we will make a cookie that gives a message of isLoggedIn and sets flag to true
                    // // This will be used in protect route , so that access of user's data can be only given
                    // // to logged in users.
                    // res.cookie('isLoggedIn' , true , {httpOnly : true});

                    // Instead of cookie we will use JWT
                    // In payload : UID
                    // In secretKey : We give secret key stored in backend (secrets.js)
                    // In third field we can give algorithm, Here we don't we use default SHA256
                    let uid = user['_id'];  //  _id : Unique id created by mongodb
                    let token = jwt.sign({payload : uid} , JWT_KEY);  // signature
                    // In cookie we send token 
                    res.cookie('login' , token , {httpOnly : true});


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

// isAuthorized ->  To check the user's role , [admin , deliveryBoy , user , restaurantOwner]

module.exports.isAuthorised =  function isAuthorised(roles) {
    return function(req,res,next) {
        if(roles.include(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message : "Operation not allowed"
            })
        }
    }
}

// protectRoute
module.exports.protectRoute = async function protectRoute(req,res,next) {
    try{
        let token;
        // We will check if user is logged in or not through jwt
        // Check jwt sent thru login cookie created in loginUser fn of authRouter
        if(req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            // makes a new signature (token , key)
            // isVerified is true if new and old signature are the same
            let payload = jwt.verify(token,JWT_KEY);

            if(payload) {
                const user = await userModel.findById(payload.payload);

                // ????????????????????????????
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message : "LOGIN AGAIN"
                })
            }
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

const jwt = require('jsonwebtoken');
// Random secret key stored in backend
const JWT_KEY = require('../../secrets');


function protectRoute(req,res,next) {
    // We will check if user is logged in or not through jwt
    // Check jwt sent thru login cookie created in loginUser fn of authRouter
    console.log(req.cookies);
    if(req.cookies.login) {
        // makes a new signature (token , key)
        // isVerified is true if new and old signature are the same
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified)
        {
            next();
        }
        else {
            return res.json({
                message : "User not verified"
            })
        }
    }
    else {
        return res.json({
            message: "Operation not allowed , ePlease login first"
        })
    }
}

module.exports = protectRoute;
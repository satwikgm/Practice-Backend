function protectRoute(req,res,next) {
    // We will check if user is logged in or not through cookies
    // Check cookie created in loginUser fn of authRouter
    if(req.cookies.isLoggedIn) {
        next();
    }
    else {
        return res.json({
            message: "Operation not allowed , ePlease login first"
        })
    }
}

module.exports = protectRoute;
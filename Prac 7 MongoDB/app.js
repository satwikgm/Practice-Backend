const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});

app.use(cookieParser());
  
// mini app :
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

// base routers : Routes to use
app.use('/users',userRouter);   // Base Router is /users
app.use('/auth',authRouter);   // Base Router is /auth


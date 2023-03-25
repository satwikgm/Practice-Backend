const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});

const users = [
    { name: 'John', id: 1 },
    { name: 'Jane', id: 2 },
    { name: 'Bob', id: 3 },
    { name: 'Alice', id: 4 },
    { name : 'John2' , id : 1}
];
  
// mini app
const userRouter = express.Router();
const authRouter = express.Router();
// base route
app.use('/users',userRouter);   // Base Router is /users
app.use('/auth',authRouter);   // Base Router is /auth

// For get , post , patch , delete and queries
userRouter
    .route("/")                 // First parameter in any normal route
    .get(getUsers)              // Second parameters (Functions) ....
    .post(postUsers)
    .patch(updateUsers)
    .delete(deleteUsers);

userRouter.route("/:id").get(getUsersById);

authRouter
    .route('/signup')
    .get(middleware1 , getSignUp , middleware2)
    .post(postSignUp);

// middleware
authRouter
    .route('/signup')
    .get(middleware1 , getSignUp)
    .post(postSignUp);

function middleware1(req,res,next) {
    console.log('Middleware1 encountered');
    next();
}

function getUsers(req,res) {
    console.log('getUser called');
    res.send(users);
}

function postUsers(req,res) {
    console.log(req.body);
    users = req.body;

    res.json({
        message : "Data received successfully" , 
        user : req.body
    })
}

function updateUsers(req,res) {
    console.log('req-body-data-> ' , req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message : "Data updated successfully"
    })
}

function deleteUsers(req,res) {
    users = {}
    res.json({
        message : "Data has been successfully deleted"
    });
}

function getUsersById(req,res) {
    console.log(req.params.id);
    let paramsId = req.params.id;
    let obj = {};
    for(let i=0;i<users.length;i++) {
        if(users[i]['id'] == paramsId) {
            obj = users[i];
        }
    }
    res.json({
        message : "request received",
        data : obj
    });
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

function postSignUp(req,res) {
    // We received this from frontend
    // Anything received is always stored in the req.body
    let dataObject = req.body;
    // This will get printed on our backend based on the object received from frontend
    console.log('Backend ->' , dataObject);
    res.json({
        message : "User signed up" , 
        data : dataObject
    });
}




// MongoDB

// The db link here should not be exposed as it will lead to our entire db being public
// So for now this piece of code is here
// Later it will be shifted to a private file

const db_link = 'mongodb+srv://admin:N6asx6Vf993r6AI4@cluster0.kowujyl.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function(db) {
        // console.log(db);
        console.log('db connected');
    })
    .catch(function(err) {
        console.log(err);
    });

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true,
        minLength:8
    },
    confirmPassword : {
        type : String ,
        required : true,
        minLength:8
    }
    // Password and confirmPassword will be matched through "mongoDB hooks" (later)
});

// model
// Model based on our schema above (Login schema)
const userModel = mongoose.model('userModel' , userSchema);

// An immediately invoked function
// This function will be immediately called on running the server
// To get stored properly in the collection : all fields are required , email should be unique and password length must be >= 8
(async function createUser() {
    let user = {
        name : "Chinu",
        email : "chintu@gmail.com",
        password : "2223",
        confirmPassword : "2223"
    };
    // Takes an object as parameter
    let data = await userModel.create(user);
    console.log(data);
})();

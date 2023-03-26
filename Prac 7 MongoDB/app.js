const express = require('express');
const userModel = require('./public/models/userModel');
const app = express();

// Middleware
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});

// const users = [
//     { name: 'John', id: 1 },
//     { name: 'Jane', id: 2 },
//     { name: 'Bob', id: 3 },
//     { name: 'Alice', id: 4 },
//     { name : 'John2' , id : 1}
// ];
  
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


// CRUD Operations : Get => Read => We want to retrieve some data => find , findOne
async function getUsers(req,res) {
    // console.log(req.query);
    let allUsers = await userModel.find();
    let allUsers1 = await userModel.findOne({"name": "Satwik",});
    res.json({
        message : 'List of all users',
        data1 : allUsers  ,
        // data2 : allUsers1
    });
}

// CRUD Operations : Post=> We want to send some data from frontend to backend=> 
function postUsers(req,res) {
    console.log(req.body);
    users = req.body;

    res.json({
        message : "Data received successfully" , 
        user : req.body
    })
}


// CRUD Operations : Patch => Update => Need to update an already existing data => findOneAndUpdate() 
async function updateUsers(req,res) {
    console.log('req-body-data-> ' , req.body);
    let dataToBeUpdated = req.body;
    // for(key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }

    // MongoDB Part
    // Here we are updating the details of person with email into dataToBeUpdated coming as request
    let userToBeUpdated = await userModel.findOneAndUpdate({"email": "satwik@gmail.com"},dataToBeUpdated);

    res.json({
        message : "Data updated successfully",
        data : userToBeUpdated
    })
}

// CRUD Operations : DELETE => findOneAndDelete() => Find something and delete
async function deleteUsers(req,res) {
    // users = {}

    let dataToBeDeleted = req.body;
    let userToBeDeleted = await userModel.findOneAndDelete(dataToBeDeleted)
    res.json({
        message : "Data has been successfully deleted",
        dataDeleted : userToBeDeleted
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




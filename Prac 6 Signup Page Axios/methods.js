const express = require('express');

const app = express();

// Middleware
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});

let users = [];

// mini app
const userRouter = express.Router();
// base rout
app.use('/users',userRouter);

// For get , post , patch & delete queries
userRouter
    .route('/')
    .get(getUsers)
    .post(postUsers)
    .patch(updateUsers)
    .delete(deleteUsers)

// For params
userRouter.route('/:id').get(getUsersById);

function getUsers(req,res) {
    console.log(req.query);
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
    console.log(req.params);
    res.send("User id created")
}
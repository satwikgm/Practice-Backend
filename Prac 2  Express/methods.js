const express = require('express');

const app = express();

// Middleware
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});

let users = {}

// get : Used to retrieve data from a server , 
// Here we are displaying the users object that we will receive from server
app.get("/users" , (req,res)=>{
    console.log(req.query);
    console.log(req.query.name);
    console.log(req.query.age);
    res.send(users);
});

// post : Used to send(submit) data from frontend to backend , to submit 
app.post('/users' , (req,res)=>{
    // received something from the frontend
    console.log(req.body);
    users = req.body;

    // We are sending response as a json object to front end.
    // There are two keys in our response message and user.
    res.json({
        message : "Data received successfully" , 
        // Send this user response as frontend body in the postman body
        // user is an object like users that will be displayed as frontend
        user : req.body
    })
})

// patch : Used to update a specific resource
app.patch('/users' , (req,res)=>{
    // Request of update
    console.log('req-body-data-> ' , req.body);
    // This data has to be updated in the users object
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message : "Data updated successfully"
    })
})

// delete : Used to delete specific resource
app.delete('/users' , (req,res)=>{
    users = {}
    res.json({
        message : "Data has been successfully deleted"
    });
});

// params : Included in url of the http requests , Used to pass additional information 
// apart from the http requests

// Here id is a parameter
app.get('/users/:id' , (req,res)=>{
    console.log(req.params.id)
    console.log(req.params)
    res.send("User id created")
})

// Here userame is a parameter
app.get('/users/:username' , (req,res)=>{
    console.log(req.params.username)
    console.log(req.params)
    res.send("Username created")
})
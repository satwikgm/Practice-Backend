const express = require('express');

const app = express();

app.use(express.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
})

let users = {};

// Queries : For filtering data
// No need to have another get method  , Can be used along with "?" and "&".
// example  => http://localhost:3000/users/?name=satwik&age=21&college=msrit&usn=106
// Passed 4 queries starting from ?
app.get("/users" , (req,res)=>{
    console.log(req.query);
    console.log(req.query.name);
    console.log(req.query.age);
    console.log(req.query.college);
    console.log(req.query.usn);
    res.send(users);
});

// Params  
// In params we show data as it is by searching it from db and displaying it
// So we need to have an appropriate route in the get method using /:<id here>
// example : http://localhost:3000/users/23 => User with id 23
app.get('/users/:id' , (req,res)=>{
    console.log(req.params);
    console.log("The user id created using call from postman is : "+req.params.id);
    res.send("User created");
});

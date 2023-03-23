const express = require('express');

const app = express();

app.use(express.json());


app.listen(3000 , ()=>{
    console.log("Server started on 3000");
});

// Middle ware function => Used in Post requests , Data from frontend converted to json 

let users = {};


// get request
app.get('/users' , (req,res) => {
    res.send(users);
})  

// post request : To send data from frontend to backend
app.post('/users' , (req,res)=>{
    console.log(req.body);
    users = req.body;
    // Same as res.send
    res.json({
        message:"Data received successfully",
        user : req.body
    });
});

// update request : req obtained here is to update something
app.patch('/users',(req,res)=>{
    // Print data from req body
    console.log('req-body-data-> ' , req.body);
    // update data in users object

    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message : "Data updated successfully" 
    })
})


// delete request : To delete data
app.delete('/users' , (req,res)=>{
    users = {};
    res.json({
        message : "Data has been deleted"
    })
})
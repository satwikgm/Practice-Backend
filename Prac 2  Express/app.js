const express = require('express');

const app = express();


// Send HTML files
app.get("/" , (req,res)=>{
    res.sendFile('./views/index.html' ,  {root:__dirname})
})

app.get("/about" , (req,res)=>{
    res.sendFile('./views/about.html' ,  {root:__dirname})
})

// Redirects
app.get('/about-us' , (req,res)=>{
    res.redirect('/about');
});

// 404 page
// app.use is executed when no app.get above gets executed , its analogous to default in switch
app.use((req,res)=>{
    // res.statusCode = 404;
    res.status(404).sendFile('./views/404.html' , {root:__dirname});
})

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
})


// HTTP Requests

// GET

// POST -> To send data from frontend to backend


// server creation

// 1. http module : We need to require this module

const http = require('http');
const fs = require('fs');    // allows working with the file system
const _ = require('lodash');

// 2. Method to create a server in the http module
        // req : request object contains metadata(where , what ...) of the request coming from the browser
        // res : response object is used to send back the response for the request
    const server = http.createServer((req,res)=> {
        console.log("Request has been made from browser to server");  // Will get consoled on terminal and not on the browser

    // Usage of lodash
    const num = _.random(0,20)
    console.log(num);

    // req object
    // console.log(req.method);
    // console.log(req.url);

    // res object
    res.setHeader('Content-type','text/html');

    let path = './views';
    switch(req.url) {
        case '/':
            path += '/index.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301; // status code for something that has been permanently moved
            res.setHeader('Location','/about');
            res.end();
            break;
        case '/about':
            path += '/about.html';
            res.statusCode=200;
            break;
        default:
            path += '/404.html';
            res.statusCode=404;
            break;
    }
    
    fs.readFile(path , (err,fileData)=>{
        if(err){
            console.log(err);
        }
        else {
            // res.write(fileData);  // res.write(...) can be used for multiple files
            res.end(fileData);
        }
    })
})


// arguments of listen : port no , host , callback function 
server.listen(3000 , 'Localhost',()=>{
    console.log("Server is listening on port 3000"); // Will get consoled on terminal and not on the browser
})
// Till now we have not sent any response so if we go to localhost:3000 on browser 
// it won't show any response and will give timeout error
const express = require('express');

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
// const userRouter = express.Router();
const authRouter = express.Router();
// base route
// app.use('/users',userRouter);   // Base Router is /users
app.use('/auth',authRouter);   // Base Router is /auth

// For get , post , patch , delete and queries
// userRouter
//     .route("/")                 // First parameter in any normal route
//     .get(getUsers)              // Second parameters (Functions) ....
//     .post(postUsers)
//     .patch(updateUsers)
//     .delete(deleteUsers);

// For params 
// userRouter.route("/:id").get(getUsersById);

// authRouter
//     .route('/signup')
//     .get(getSignUp)
//     .post(postSignUp);

// middleware
authRouter
    .route('/signup')
    .get(middleware , getSignUp)
    .post(postSignUp);

    // How to use middleware function
    // We use next to call the next middle ware function
function middleware(req,res,next) {
    console.log('Middleware encountered');
    next();
}


// Instead of using these we are using the above router to route users
// // get : Used to retrieve data from a server , 
// app.get("/users" , );

// // post : Used to send(submit) data from frontend to backend , to submit 
// app.post('/users' , )

// // patch : Used to update a specific resource
// app.patch('/users' , )

// // delete : Used to delete specific resource
// app.delete('/users' , );

// // params : Included in url of the http requests , Used to pass additional information 
// app.get('/users/:id' , (req,res)=>{
// })

// function getUsers(req,res) {
//     console.log(req.query);
//     res.send(users);
// }

// function postUsers(req,res) {
//     console.log(req.body);
//     users = req.body;

//     res.json({
//         message : "Data received successfully" , 
//         user : req.body
//     })
// }

// function updateUsers(req,res) {
//     console.log('req-body-data-> ' , req.body);
//     let dataToBeUpdated = req.body;
//     for(key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key];
//     }
//     res.json({
//         message : "Data updated successfully"
//     })
// }

// function deleteUsers(req,res) {
//     users = {}
//     res.json({
//         message : "Data has been successfully deleted"
//     });
// }

// function getUsersById(req,res) {
//     console.log(req.params.id);
//     let paramsId = req.params.id;
//     let obj = {};
//     for(let i=0;i<users.length;i++) {
//         if(users[i]['id'] == paramsId) {
//             obj = users[i];
//         }
//     }
//     res.json({
//         message : "request received",
//         data : obj
//     });
// }

// Send HTML files
function getSignUp(req,res) {
    console.log('Now get signup is called');
    res.sendFile('/public/index.html' , {root : __dirname});
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
const userModel = require('../public/models/userModel')

// CRUD Operations : Get => Read => We want to retrieve some data => find , findOne
module.exports.getUsers = async function getUsers(req,res) {
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
module.exports.postUsers = function postUsers(req,res) {
    console.log(req.body);
    users = req.body;

    res.json({
        message : "Data received successfully" , 
        user : req.body
    })
}


// CRUD Operations : Patch => Update => Need to update an already existing data => findOneAndUpdate() 
module.exports.updateUsers = async function updateUsers(req,res) {
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
module.exports.deleteUsers = async function deleteUsers(req,res) {
    // users = {}

    let dataToBeDeleted = req.body;
    let userToBeDeleted = await userModel.findOneAndDelete(dataToBeDeleted)
    res.json({
        message : "Data has been successfully deleted",
        dataDeleted : userToBeDeleted
    });
}

module.exports.getUsersById = function getUsersById(req,res) {
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

module.exports.setCookies = function setCookies(req,res) {
    // res.setHeader('Set-Cookie','isLoggedIn=true')
    // Cookie will expire after one day
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure: true, httpOnly: true});
    res.cookie('isPrimeMember',true);
    res.send('cookies have been set');
}

module.exports.getCookies = function getCookies(req,res) {
    // res.setHeader('Set-Cookie','isLoggedIn=true')
    // res.send('cookies has been set');
    let cookies = req.cookies.isLoggedIn;
    console.log(cookies);
    res.send("Cookies saved");
}


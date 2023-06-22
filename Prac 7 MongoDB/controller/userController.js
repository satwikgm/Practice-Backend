const userModel = require('../public/models/userModel')

// CRUD Operations : Get => Read => We want to retrieve some data => find , findOne
module.exports.getUser  = async function getUser(req,res) {
    // console.log(req.query);
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user) {
        return res.json(user)
    }
    else {
        return res.json({
            message : "User not found"
        })
    }
}

// CRUD Operations : Patch => Update => Need to update an already existing data => findOneAndUpdate() 
module.exports.updateUser = async function updateUsers(req,res) {
    // console.log('req-body-data-> ' , req.body);
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
    
        if(user) {
            const keys = [];
            for(let key in dataToBeUpdated) {
                keys.push(key);
            }
    
            for(let i=0;i<keys.length;i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
        
            const updatedData = await user.save();
    
            res.json({
                message : "Data updated successfully",
                data : userToBeUpdated
            })
        }
        else {
            res.json({
                message : "User not found"
            });
        }
    } catch (err) {
        res.json({
            message : err
        })
    }
}

// CRUD Operations : DELETE => findOneAndDelete() => Find something and delete
module.exports.deleteUser = async function deleteUsers(req,res) {
    // users = {}

    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id)
        if(!user) {
            res.json({
                message : "User does not exist"
            })
        }
        res.json({
            message : "Data has been successfully deleted",
            dataDeleted : userToBeDeleted
        });
    }
    catch(err) {
        res.json({
            message : err
        })
    }
}

module.exports.getAllUser = async function getUsersById(req,res) {
    try {
        let users = await userModel.find();
        if(users) {
            res.json({
                message : "users retreived",
                data : users
            })
        }
        else {
            res.json({
                message: "No users"
            })
        }
    } catch (err) {
        res.json({
            message : err
        })
    }
}

// module.exports.setCookies = function setCookies(req,res) {
//     // res.setHeader('Set-Cookie','isLoggedIn=true')
//     // Cookie will expire after one day
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure: true, httpOnly: true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookies have been set');
// }

// module.exports.getCookies = function getCookies(req,res) {
//     // res.setHeader('Set-Cookie','isLoggedIn=true')
//     // res.send('cookies has been set');
//     let cookies = req.cookies.isLoggedIn;
//     console.log(cookies);
    // res.send("Cookies saved");
// }
// 

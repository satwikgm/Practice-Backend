const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');



// MongoDB

const db_link = 'mongodb+srv://admin:N6asx6Vf993r6AI4@cluster0.kowujyl.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function(db) {
        // console.log(db);
        console.log('db connected');
    })
    .catch(function(err) {
        console.log(err);
    });

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true,
        validate : function() {
            return emailValidator.validate(this.email);
        }
    },
    password : {
        type : String ,
        required : true,
        minLength:8
    },
    confirmPassword : {
        type : String ,
        required : true,
        minLength:8,
        validate : function() {
            return this.confirmPassword == this.password;
        }
    }
});


// Pre hooks
userSchema.pre('save' , function() {
    console.log('Before saving in the db' , this);
});


userSchema.pre('save' , function() {  
    this.confirmPassword = undefined;
})

userSchema.pre('save' , async function() {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password , salt);
    console.log(hashedString); // This is the hash of password
    // Password should not be stored as it is .
    // So we are storing the password as its hash in our database
    this.password = hashedString;
})

// Post Hooks
userSchema.post('save' , function(doc) {
    console.log('After saving in the db' , doc);
});


// model
// Model based on our schema above (Login schema)
const userModel = mongoose.model('userModel' , userSchema);
module.exports = userModel;



// (async function createUser() {
//     let user = {
//         name : "abcd",
//         email : "abcd@gmail.com",
//         password : "222389191",
//         confirmPassword : "222389191"
//     };
//     // Takes an object as parameter
//     let data = await userModel.create(user);
//     console.log(data);
// })();

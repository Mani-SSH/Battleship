/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');
const { Player } = require('./player');

const PlayerModel = require('./PlayerSchema'); // PlayerModel is mongoose model imported from PlayerSchema.js

/* Connectiing mongoose server to Database */
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})
 
/* function to concat the usernames*/
function Mongoose_concat(name,tag,password)
{
    var Username = name.concat("#",tag);
    SignUp(Username,password);
}


/*
This function first checks the condition for Signup.
If there is already existing Username, Password is checked. For this Signup() function is called.
If there isn't any, Username and Password will be added to DB with default score 0
*/
function SignUp(Username, Password)
{
    PlayerModel.countDocuments({Username: Username},function(err,count) // Checking if there's any existing username
    {
        if(count>0) // condition for existing username
        {
        console.log("Username already exits....");
        console.log("checking for password.....");
        LogIn(Username,Password); // LogIn function is called....
        }
    else
    {
        ImportInfo(Username,Password); // async function is called
        async function ImportInfo(Username,Password) // for storing data, async function is needed.
        {
            try{
                const Usermodel = PlayerModel(); // creating an object of Model
                Usermodel.Username = Username; // filing the data
                Usermodel.Password = Password; // filling the data
                await Usermodel.save();         // calling save() method, to save the data
                console.log(Usermodel);         // printing the new data 
            }
            catch(e)
            {
                console.log(e.message); // error
            }
        }
    }
})
}

function LogIn(Username,Password)  // called from SignUp()
{
    PlayerModel.findOne({Username: Username}, function(err,docs) // Since username is unique, findOne is used...
    {
        if(err)
        {
            console.log("There has been an error....Mongoose.js"); // error
        }
        else
        {
            docs.toObject(); // docs is Mongoose Object at first. Converting it to JS object
            if(docs.Password == Password) // Checking for password
            {
                console.log("Password matched....");  // true
            }
            else
            {
                console.log("Incorrect password....")  // false
            }
        }
    })
}

module.exports = Mongoose_concat;
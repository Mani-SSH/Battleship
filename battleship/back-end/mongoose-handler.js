/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');
const { Player } = require('./player');

const PlayerModel = require('./PlayerSchema'); // PlayerModel is mongoose model imported from PlayerSchema.js



/* Connectiing mongoose server to Database */
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})
 

/**
 * This function first checks the condition for Signup.
 * If there is already existing Username, Password is checked. For this Signup() function is called.
 * If there isn't any, Username and Password will be added to DB with default score 0
 * @param {string} Name 
 * @param {string} Tag 
 * @param {string} Password 
 */
function signUp(Name, Tag, Password)
{   
    var Username = Name.concat("#",Tag);
    PlayerModel.countDocuments({Username: Username}, (err,count) => { // Checking if there's any existing username
            if(count>0) // condition for existing username
            {
            console.log("Username already exits....");
            }
        else
        {
            importInfo(Username,Password); // async function is called
            async function importInfo(Username,Password) // for storing data, async function is needed.
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


/**
 * checks if account with matching login details is in database
 * @param {string} name 
 * @param {string} tag 
 * @param {string} password 
 * @returns true if login details matched, else false
 */
function logIn(name, tag, password)
{
    let username = name.concat("#",tag);
    let isSuccessful = false;
    const thisPlayer = new Player;
    PlayerModel.findOne({ username }, function(err,docs) // Since username is unique, findOne is used...
    {
        if(err){
            console.log("There has been an error....Mongoose.js"); // error
        }else{
            docs.toObject(); // docs is Mongoose Object at first. Converting it to JS object
            if(docs.Password == password) // Checking for password
            {
                console.log("Password matched....");  // true
                thisPlayer.setDetails(docs.Username, docs.Score);
                console.log(thisPlayer);
                isSuccessful = true;
            }
            else
            {
                console.log("Incorrect password....");  // false
            }
        }
    })
    return isSuccessful;
}

module.exports.signUp = signUp;
module.exports.logIn = logIn;
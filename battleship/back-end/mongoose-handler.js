/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');
const { Player } = require('./classes/player');
const { exists } = require('./mongo-schemas/PlayerSchema');

const PlayerModel = require('./mongo-schemas/PlayerSchema'); // PlayerModel is mongoose model imported from PlayerSchema.js



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

module.exports.signUp = function signUp(Name, Tag, Password,callback)
{   
    var Username = Name.concat("#",Tag);
    PlayerModel.countDocuments({Username: Username}, (err,count) => { // Checking if there's any existing username
            if(count>0) // condition for existing username
            {
            console.log("Username already exits....");
            callback(null,true);
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
                    callback(null,false);
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
module.exports.logIn = function logIn(name, tag, password, callback){
    let username = name.concat("#",tag);
    PlayerModel.findOne({Username: username}, function(err,docs){ // Since username is unique, findOne is used...
        /* if any error occured */
        if(err){
            console.log("There has been an error....Mongoose.js"); // error
            callback(err);
            return;
        }
        
        /* if username not found */
        if (docs == null){
            console.log("NO matches in database...")
            callback(null, undefined);
            return;
        }

        else{
        docs.toObject(); // docs is Mongoose Object at first. Converting it to JS object

        /* if password is wrong */
        if(docs.Password != password){
            callback(null, undefined);
            return;
        }

        else{
        /* if username found and password matched */
        /* get details of the player */
        const thisPlayer = new Player;
        thisPlayer.setDetails(docs.Username, docs.Score);

        /* return details of player with callback */
        callback(null, thisPlayer);
        updateStatus(docs.Username)
        return;
        }
    }
    })
}
/**
 * 
 * toggles the isLoggedIn data to true in the db
 * @param {string} username
 */
async function updateStatus(username)
{
    await PlayerModel.findOneAndUpdate({Username: username}, {isLoggedIn: 'true'})
    return;
}
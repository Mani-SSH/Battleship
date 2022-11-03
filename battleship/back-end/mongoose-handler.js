require("dotenv/config")

/* mongoDB connection */
const mongoose = require('mongoose');
const { Player } = require('./classes/player');
const { exists } = require('./mongo-schemas/PlayerSchema');

const PlayerModel = require('./mongo-schemas/PlayerSchema'); // PlayerModel is mongoose model imported from PlayerSchema.js

/* Connectiing mongoose server to Database */
mongoose.connect(process.env.MONGO_CONN_STRING, (err) => {
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
        if(docs.Password != password || docs.isLoggedIn === true){
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

/**
 * returns the top 5 score from the PlayerModel schema with desesnding scores
 * the mongoDB array is converted into plane JS array
 */
module.exports.ScoreBoard = async (callback) => {
    try{
        const scores = await PlayerModel
        .find({})
        .sort({Score : -1})     // -1 is for desending order sorting
        .limit(5)               // max of 5 objects are passed
        .lean()                 // converting into plain array
        .exec( function(err, docs){     // callback function to return the result
            callback(null, docs)    
            return
        })
    }
    catch(err)              // if any error, occurs. error handling is done here
    {
        console.log("eror",err);
        callback(err, null)
    return
    }
}


module.exports.LogOut = async (name, tag, callback) => {
    let Username = name.concat("#",tag)
    try{
        const thisPlayer = await PlayerModel
        .findOneAndUpdate({Username: Username}, {isLoggedIn: 'false'})
        .exec( function(err, docs){
            callback(null, true)
            return
        })
    }
    catch(err)
    {
        callback(err,false)
        return
    }
}


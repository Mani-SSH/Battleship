class Player{
    /**
     * @param {string} name 
     * @param {string} tag 
     * @param {number} score 
     */
    constructor(name = "", tag = "", score = 0){
        this.name = name;
        this.tag = tag;
        this.score = score;
    }

    /**
     * 
     * @param {string} UserID 
     * @param {number} score 
     */
    setDetails(UserID, score){
        this.name = UserID.slice(0, (UserID.length - 5));
        this.tag = UserID.slice((UserID.length - 4), UserID.length )
        this.score = score;
    }
}

exports.Player = Player;
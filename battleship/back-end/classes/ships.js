const { ShipList } = require("../data/shiplist")

class Ship {
    /**
     * @param {number} length 
     * @param {number[][]} coords 
     */
    constructor(length, coords){
        this.length = length
        this.coords = coords
    }


    /**
     * @param {number} x 
     * @param {number} y 
     * @return {boolean} true if the ship is hit
     */
    isHit(x, y){
        /* for each coordinate check, x and y matched */
        for(let i = 0; i < this.coords.length; i++){
            /* if coordinates matched, return true */
            if(this.coords[i][0] === x && this.coords[i][1] === y){
                return true
            }
        }
        return false
    }
}

exports.Ship = Ship
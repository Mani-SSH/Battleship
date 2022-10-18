const { Ship } = require("./ships")
const { ShipList } = require("../data/shiplist")

class Board {
    constructor(){
        this.hitShipCoords = {
            submarine: [],
            corvette: [],
            frigate: [],
            destroyer: [],
            carrier: []
        }
    }


    /**
     * @returns true if empty 
     */
    isEmpty(){
        if(Object.keys(this).length === 0){
            return true
        }

        return false
    }

    /**
     * @param {number[]} submarineXYs 
     * @param {number[]} corvetteXYs 
     * @param {number[]} frigateXYs 
     * @param {number[]} destroyerXYs 
     * @param {number[]} carrierXYs 
     */
    setBoard(submarineXYs, corvetteXYs, frigateXYs, destroyerXYs, carrierXYs){
        this.submarine = new Ship(ShipList.CARRIER.length, submarineXYs)
        this.corvette = new Ship(ShipList.CORVETTE.length, corvetteXYs)
        this.frigate = new Ship(ShipList.FRIGATE.length, frigateXYs)
        this.destroyer = new Ship(ShipList.DESTROYER.length, destroyerXYs)
        this.carrier = new Ship(ShipList.CARRIER.length, carrierXYs)
    }


    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Object} coordinates that is hit
     */
    doMissile(x, y){
        let hitCoords = []
        let missedCoords = []
        let isHit = false
        /* for each ship check coordinate if it matches */
        Object.keys(this).forEach((ship) => {
            /* if hit push the coordinates in hitCoords */
            if(this[ship].isHit(x, y)){
                isHit = true
                hitCoords.push([x, y])
            }
        })

        if(!isHit){
            missedCoords.push([x, y])
        }

        return { hitCoords, missedCoords }
    }

    doAirStrike(x,y){
        let hitCoords = []
        let missedCoords = []
        let isHit = false
        for(let i = 1; i < 10; i++)
        {
            Object.keys(this).forEach((ship) => {
                if(this[ship].isHit(i, y)){
                    isHit = true
                    hitCoords.push([i, y])
                    this.hitShipCoords[ship].push([i,y])
                }   
                else
                {
                    isHit = false
                }
        })
        if (!isHit)
        {
            missedCoords.push([i,y])
        }
        }
        console.log(this.hitShipCoords)
        return{ hitCoords, missedCoords }    
}

}

exports.Board = Board

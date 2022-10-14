const { Ship } = require("./ships")
const { ShipList } = require("../data/shiplist")

class Board {
    // constructor(){
    //     this.submarine = {}
    //     this.corvette = {}
    //     this.frigate = {}
    //     this.destroyer = {}
    //     this.carrier = {}
    // }

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
        let effectedCoords = []
        /* for each ship check coordinate if it matches */
        Object.keys(this).forEach((ship) => {
            /* if hit push the coordinates in hitCoords */
            if(this[ship].isHit(x, y)){
                hitCoords.push([x, y])
            }
        })
        effectedCoords([x, y])

        return { hitCoords, effectedCoords }
    }
}

exports.Board = Board

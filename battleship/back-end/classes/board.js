const { Ship, ShipList } = require("./ships")

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
}

exports.Board = Board

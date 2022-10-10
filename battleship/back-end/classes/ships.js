const ShipList = {
    SUBMARINE: {
        id: "submarine",
        length: 2
    },
    FRIGATE: {
        id: "frigate",
        length: 2
    },
    DESTROYER: {
        id: "destroyer",
        length: 3
    },
    CORVETTE: {
        id: "corvette",
        length: 3
    },
    CARRIER: {
        id: "carrier",
        length: 4
    }
}

class Ship {
    /**
     * @param {number} length 
     * @param {number[][]} coords 
     */
    constructor(length, coords){
        this.length = length
        this.coords = coords
    }
}

exports.ShipList = ShipList
exports.Ship = Ship
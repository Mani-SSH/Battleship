const { Ship } = require("./ships")
const { ShipList } = require("../data/shiplist")

class Board {
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
        this.ships = {
            submarine: new Ship(ShipList.CARRIER.length, submarineXYs),
            corvette: new Ship(ShipList.CORVETTE.length, corvetteXYs),
            frigate: new Ship(ShipList.FRIGATE.length, frigateXYs),
            destroyer: new Ship(ShipList.DESTROYER.length, destroyerXYs),
            carrier: new Ship(ShipList.CARRIER.length, carrierXYs)
        }

        this.hitShipCoords = {
            submarine: [],
            corvette: [],
            frigate: [],
            destroyer: [],
            carrier: []
        }
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
        Object.keys(this.ships).forEach((ship) => {
            /* if hit push the coordinates in hitCoords */
            if(this.ships[ship].isHit(x, y)){
                isHit = true
                hitCoords.push([x, y])
                this.hitShipCoords[ship].push([x,y])
            }
        })

        if(!isHit){
            missedCoords.push([x, y])
        }
        console.log(this.hitShipCoords)
        return { hitCoords, missedCoords }
    }

    doAirStrike(x,y){
        let hitCoords = []
        let missedCoords = []
        for(let i = 1; i < 10; i++)
        {
            let isHit = false
            Object.keys(this.ships).forEach((ship) => {
                if(this.ships[ship].isHit(i, y)){
                    isHit = true
                    hitCoords.push([i, y])
                    this.hitShipCoords[ship].push([i,y])
                    console.log(this.ships[ship].isHit(i, y))

                }
        })
            if(!isHit)
            {
                missedCoords.push([i,y])
            }
        }
        console.log(this.hitShipCoords)
        return{ hitCoords, missedCoords }    
    }

    doClusterAttack(x,y){
        let hitCoords = []
        let missedCoords = []
        for (let i = -1; i <= 1; i++ )
        {
            for (let j = -1; j <= 1 ; j++)
            {
                let isHit = false
                Object.keys(this.ships).forEach((ship) => {
                if(this.ships[ship].isHit(x + i, y + j)){
                    isHit = true
                    hitCoords.push([x + i, y + j])
                    this.hitShipCoords[ship].push([x + i, y + j])
                }
                })
                if(!isHit)
                {
                    missedCoords.push([x + i, y + j])
                }
            }
        }
        console.log(this.hitShipCoords)
        return{ hitCoords, missedCoords }
    }

}

exports.Board = Board

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
            submarine: new Ship(ShipList.SUBMARINE.length, submarineXYs),
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
        let destroyedShips = []
        /* for each ship check coordinate if it matches */
        Object.keys(this.ships).forEach((ship) => {
            /* if hit push the coordinates in hitCoords */
            if(this.ships[ship].isHit(x, y)){
                isHit = true
                hitCoords.push([x, y])
                if (this.hitShipCoords[ship].length != 0)
                {
                    let isMatched = false
                    console.log(`Before the push: ${this.hitShipCoords[ship].length}`)
                    for (let i = 0; i < this.hitShipCoords[ship].length; i++)
                    {
                        if((x === this.hitShipCoords[ship][i][0] && y=== this.hitShipCoords[ship][i][1]))
                        {
                            isMatched = true
                            break
                        }
                    }

                    if(!isMatched)
                    {
                        this.hitShipCoords[ship].push([x,y])
                    }

                }
                else
                {
                    this.hitShipCoords[ship].push([x,y])
                }

                if(this.hitShipCoords[ship].length === this.ships[ship].length)
                {
                    destroyedShips.push(ship)
                }
               
            }
        })

        if(!isHit){
            missedCoords.push([x, y])
        }
        console.log(this.hitShipCoords)
        console.log(destroyedShips)
        return { hitCoords, missedCoords, destroyedShips }
    }

    doAirStrike(x,y){
        let hitCoords = []
        let destroyedShips = []
        let missedCoords = []
        for(let i = 1; i < 10; i++)
        {
            let isHit = false
            Object.keys(this.ships).forEach((ship) => {
                if(this.ships[ship].isHit(i, y)){
                    isHit = true
                    hitCoords.push([i, y])
                    if (this.hitShipCoords[ship].length != 0)
                    {
                        let isMatched = false;
                        for (let j = 0; j < this.hitShipCoords[ship].length; j++)
                        {
                            if((i === this.hitShipCoords[ship][j][0] && y=== this.hitShipCoords[ship][j][1]))
                            {
                                isMatched = true
                                break;
                            }
                        }

                        if (!isMatched)
                        {
                            this.hitShipCoords[ship].push([i,y])
                        }
                    }
                    else
                    {
                        this.hitShipCoords[ship].push([i,y])
                    }

                    if(this.hitShipCoords[ship].length === this.ships[ship].length)
                    {
                        destroyedShips.push(ship)
                    }
    
                }
        })
            if(!isHit)
            {
                missedCoords.push([i,y])
            }
        }
        console.log(this.hitShipCoords)
        console.log(destroyedShips)
        return{ hitCoords, missedCoords, destroyedShips }    
    }

    doClusterAttack(x,y){
        let hitCoords = []
        let missedCoords = []
        let destroyedShips = []
        for (let i = -1; i <= 1; i++ )
        {
            for (let j = -1; j <= 1 ; j++)
            {
                let isHit = false
                Object.keys(this.ships).forEach((ship) => {
                if(this.ships[ship].isHit(x + i, y + j)){
                    isHit = true
                    hitCoords.push([x + i, y + j])
                    if (this.hitShipCoords[ship].length != 0)
                    {
                        let isMatched = false
                        for (let k = 0; k < this.hitShipCoords[ship].length; k++)
                        {
                            if(((x + i) === this.hitShipCoords[ship][k][0] && (y + j)=== this.hitShipCoords[ship][k][1]))
                            {
                                isMatched = true
                                break
                            }
                        }

                        if (!isMatched)
                        {
                            this.hitShipCoords[ship].push([x + i, y + j])
                        }
                    }
                    else
                    {
                        this.hitShipCoords[ship].push([x + i, y + j])
                    }

                    if(this.hitShipCoords[ship].length === this.ships[ship].length)
                    {
                        destroyedShips.push(ship)
                    }
    
                }
                })
                if(!isHit)
                {
                    missedCoords.push([x + i, y + j])
                }
            }
        }
        console.log(this.hitShipCoords)
        console.log(destroyedShips)
        return{ hitCoords, missedCoords, destroyedShips }
    }

}

exports.Board = Board

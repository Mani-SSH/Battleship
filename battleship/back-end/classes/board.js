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
        
        this.sunkShips = []
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
        let destroyedShips = []
        let isGameOver = false
        let isHit = false
        /* for each ship check coordinate if it matches */
        Object.keys(this.ships).forEach((ship) => {
            /* if hit push the coordinates in hitCoords */
            if(this.ships[ship].isHit(x, y)){
                isHit = true
                hitCoords.push([x, y])
                if (this.hitShipCoords[ship].length != 0) // checks if the array is empty
                {
                    let isMatched = false
                    for (let i = 0; i < this.hitShipCoords[ship].length; i++)
                    {
                        if((x === this.hitShipCoords[ship][i][0] && y=== this.hitShipCoords[ship][i][1]))  // to avoid repetition in hit coords
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
                else    // if the array is empty, it pushes
                {
                    this.hitShipCoords[ship].push([x,y])
                }

                if(this.hitShipCoords[ship].length === this.ships[ship].length) // checking if all coords of ship is hit
                {
                    destroyedShips.push(ship)           // passing destroyed ships in front-end
                    this.sunkShips.push(ship)           // storing the ship in the array to check if the game is over
                    if (this.sunkShips.length === 5)    // if all ships are in sunkShips, the game is over
                    {
                        isGameOver = true;              // toggling game over bool
                    }
                }
               
            }
        })

        if(!isHit){
            missedCoords.push([x, y])           // if the coords are missed, it is stored here
        }
    
        // if (isGameOver)
        // {
        //     io.sockets.to(roomID).emit("Game-Over", playerID); 
        // }

        console.log(`the status: ${isGameOver}`)
        console.log(destroyedShips)
        return { hitCoords, missedCoords, destroyedShips }
    }

    doAirStrike(x,y){
        let hitCoords = []
        let destroyedShips = []
        let missedCoords = []
        let isGameOver = false                  // bool to check if all ships has been sunk
        for(let i = 1; i < 10; i++)             // counts total of 9 tiles in AirStrike
        {
            let isHit = false                   // bool for checking hit
            Object.keys(this.ships).forEach((ship) => {         // each tile is checked for all 5 ships
                if(this.ships[ship].isHit(i, y)){           // checking if any ship is hit
                    isHit = true
                    hitCoords.push([i, y])  

                    if (this.hitShipCoords[ship].length != 0)           // storing hitShipCoords if it is not empty
                    {
                        let isMatched = false;
                        for (let j = 0; j < this.hitShipCoords[ship].length; j++)       // avoiding hitShipCoords repetition
                        {
                            if((i === this.hitShipCoords[ship][j][0] && y=== this.hitShipCoords[ship][j][1]))       // checking if the hitShipCoords is repeated
                            {
                                isMatched = true
                                break;          // for loop breaks as soon as repetition is detected
                            }
                        }

                        if (!isMatched)         // if the repetition is not detected, it is stored
                        {
                            this.hitShipCoords[ship].push([i,y])    
                        }
                    }

                    else            // if the array is empty
                    {
                        this.hitShipCoords[ship].push([i,y])
                    }

                    if(this.hitShipCoords[ship].length === this.ships[ship].length) //checking if all coords of ship is hit
                    {
                        destroyedShips.push(ship)       // passing destroyed ships to front end
                        this.sunkShips.push(ship)       // storing destroyed ships to check for game over
                        if(this.sunkShips.length === 5)     // game is over once all 5 ships are sunk
                        {
                            isGameOver = true       
                        }
                    }
    
                }
        })

            if(!isHit)              // if the ship is not hit, repetition is also avoided here 
            {
                missedCoords.push([i,y])
            }
        }

        // if (isGameOver)
        // {
        //     io.sockets.to(roomID).emit("Game-Over", playerID); 
        // }

        console.log(`the status: ${isGameOver}`)
        console.log(destroyedShips)
        return{ hitCoords, missedCoords, destroyedShips }    
    }

    doClusterAttack(x,y){
        let hitCoords = []
        let missedCoords = []
        let destroyedShips = []
        let isGameOver = false
        for (let i = -1; i <= 1; i++ )              // cluster has 9 square: 3*3 sized attack
        {
            for (let j = -1; j <= 1 ; j++)
            {
                let isHit = false
                Object.keys(this.ships).forEach((ship) => {     // checking for all 5 ships
                if(this.ships[ship].isHit(x + i, y + j)){           //checking if the ship is hit: 
                    isHit = true
                    hitCoords.push([x + i, y + j])
                    if (this.hitShipCoords[ship].length != 0)       // storing hitShipCoords if it is not empty
                    {
                        let isMatched = false
                        for (let k = 0; k < this.hitShipCoords[ship].length; k++)       // checking if  tiles of a ship is repeated
                        {
                            if(((x + i) === this.hitShipCoords[ship][k][0] && (y + j)=== this.hitShipCoords[ship][k][1]))        //avoiding repetition here
                            {
                                isMatched = true
                                break
                            }
                        }

                        if (!isMatched)     // if not repeated, hit coords are stored
                        {
                            this.hitShipCoords[ship].push([x + i, y + j])
                        }
                    }

                    else    // if the array is empty
                    {
                        this.hitShipCoords[ship].push([x + i, y + j])
                    }

                    if(this.hitShipCoords[ship].length === this.ships[ship].length)     //  checking if all the tiles of the ship is hit
                    {
                        destroyedShips.push(ship)           // the destroyed ship is passed in the front end
                        this.sunkShips.push(ship)           // the destroyed ship is stored in the array for checking all the hit coords
                        if(this.sunkShips.length === 5)     // if all 5 ships are sunk, game is over
                        {
                            isGameOver = true
                        }
                    }
    
                }
                })
                if(!isHit)          // if the tile is not hit, it is stored in missedCoords and passed in front end
                {
                    missedCoords.push([x + i, y + j])           // repetition is avoided here
                }
            }
        }

        // if (isGameOver)
        // {
        //     io.sockets.to(roomID).emit("Game-Over", playerID); 
        // }

        console.log(`the status: ${isGameOver}`)
        console.log(destroyedShips)
        return{ hitCoords, missedCoords, destroyedShips }
    }

}

exports.Board = Board

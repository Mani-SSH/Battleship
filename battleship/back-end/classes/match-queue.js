class QueuePlayer{
    /**
     * 
     * @param {string} playerID 
     * @param {number} playerScore 
     * @param {string} playerSID 
     */
    constructor(playerID, playerScore, playerSocketID) {
        this.playerID = playerID
        this.score = playerScore
        this.socketID = playerSocketID
        this.next = null
    }
}

class MatchQueue{
    constructor(){
        this.head = null
        this.size = 0
    }

    /**
    * @returns {boolean} true if list is empty, else false
    */
    isEmpty(){
        return (this.head == null);
    }

    /**
     * 
     * @param {string} playerID 
     * @param {number} playerScore 
     * @param {string} playerSocketID 
     */
    addToQueue(playerID, playerScore, playerSocketID) {
        const player = new QueuePlayer(playerID, playerScore, playerSocketID)

        /* if queue is empty add to head */
        if(this.isEmpty()){
            this.head = player
            this.tail = player
            this.size++
            return
        }

        /* add to tail */
        this.tail.next = player
        this.tail = player
        this.size++
    }

    /**
     * returns opponents details if the score of opponent is within +- 50 range
     * @param {number} playerScore 
     * @returns { {string, string} | undefined } playerID of opponent as 1st param and its socket id as 2nd param
     */
    searchMatch(playerScore) {
        let currentPlayer = this.head
        
        while(currentPlayer != null) {
            if(currentPlayer.score <= (playerScore + 50) && currentPlayer.score >= (playerScore - 50)){
                const { playerID, socketID } = currentPlayer
                return { playerID, socketID }
            }
            currentPlayer = currentPlayer.next
        }

        return undefined
    }


    /**
     * @param {string} playerID 
     * @returns {boolean} true if deletion is successful
     */
    remove(playerID) {
        let currentPlayer = this.head
        let playerToDelete = null
        let isSuccessful= false

        /* get player to delete */
        while(currentPlayer != null) {
            console.log(currentPlayer.playerID)
            if(currentPlayer.playerID == playerID){
                playerToDelete = currentPlayer
                break
            }
            currentPlayer = currentPlayer.next
        }

        /* if player not is found */
        if(playerToDelete == null) {
            return isSuccessful
        }

        /* if player to delete is in head */
        if(playerToDelete == this.head){
            /* if only one element in queue */
            if(this.head == this.tail){
                this.tail = null
                this.head = null
            }else{
                this.head == this.head.next
            }
            this.size--
            isSuccessful = true
            return isSuccessful
        }

        /* else, go to player infront of player to delete*/
        currentPlayer = this.head
        while(currentPlayer.next != playerToDelete){
            currentPlayer = currentPlayer.next
        }

        /* update pointers */
        currentPlayer.next = currentPlayer.next.next

        /* if player to delete is in tail, update tail pointer */
        if(playerToDelete == this.tail) {
            this.tail = currentPlayer
        }
        this.size--

        isSuccessful = true
        return isSuccessful
    }

    /**
    * displays every node in the list
    */
    display(){
        let temp = this.head;
        while(temp) {
            console.log(temp.playerID);
            temp = temp.next;
        }
        console.log(`size: ${ this.size }\n`)
    }
}

exports.MatchQueue = MatchQueue
const { Board } = require("./board")

/* length of roomID */
const LENGTH_ROOMID = 6;
const MAX_PLAYER_PER_ROOM = 2;

/**
    * @returns 6 charactered roomID
    */
function makeRoomID() {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for ( let i = 0; i < LENGTH_ROOMID; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
}
return result;
}

class RoomPlayer {
   constructor(socketID, playerID){
      this.socketID = socketID
      this.playerID = playerID
      this.board = new Board()
   }
}


class Room{
   constructor(){
      this.elements = {
         roomID: makeRoomID(),
         players: [],
         firstTurn: ""
      }
      this.next = null;
   }

   /**
    * @returns true if the room is full, else false
    */
   isFull(){
      return (this.elements.players.length >= MAX_PLAYER_PER_ROOM);
   }

   /**
    * takes socket id of user and pushs it to players array
    * @param {string} socketID
    * @param {string} playerID
    * @returns true if new player has been added successfully, else false
    */
   addPlayer(socketID, playerID){
      if(this.isFull()){
         return false;
      }else{
         this.elements.players.push(new RoomPlayer(socketID, playerID));
         this.display();
         return true;
      }
   }


   /**
    * removes player with matching socket id
    * @param {string} socketID 
    */
   removePlayer(socketID){
      this.elements.players = this.elements.players.filter((value) => {return value.socketID != socketID});
   }


   /**
    * removes all players from the room
    */
   removePlayers(){
      this.elements.players = []
   }

   /**
    * @param {string} socketID 
    * @returns {string} opponent's socket id
    */
   getOpponentSocketID(socketID){
      if(this.elements.players[0].socketID === socketID){
         return this.elements.players[1].socketID
      }else{
         return this.elements.players[0].socketID
      }
   }


   /**
    * @param {string} socketID 
    * @returns {Board | undefined} board of a player from their socket id
    */
   getBoard(socketID){
      for(let i = 0; i < this.elements.players.length; i++){
         if(this.elements.players[i].socketID === socketID){
            return this.elements.players[i].board
         }
      }
      return undefined
   }


   /**
    * sets the board of the player with matching socket id with the given coords of the ship
    * @param {string} socketID 
    * @param {number[]} submarineXYs 
    * @param {number[]} corvetteXYs 
    * @param {number[]} frigateXYs 
    * @param {number[]} destroyerXYs 
    * @param {number[]} carrierXYs 
    * @return {boolean} true if board set successfully
    */
   setBoard(socketID, submarineXYs, corvetteXYs, frigateXYs, destroyerXYs, carrierXYs){
      let thisBoard = this.getBoard(socketID)

      if(thisBoard === undefined) return false

      thisBoard.setBoard(submarineXYs, corvetteXYs, frigateXYs, destroyerXYs, carrierXYs)
      return true
   }


   setFirstTurn(){
      /* get random number from 0 and 1 */
      const random = Math.floor(Math.random() * 2)

      /* set first turn according to random number */
      this.elements.firstTurn = this.elements.players[random].socketID
   }

   getFirstTurn(){
      return this.elements.firstTurn
   }


   /**
    * displays elements of room
    */
   display(){
      console.log(`Room: ${ this.elements.roomID }`)
      console.log(this.elements.players);
      console.log(`Player count: ${ this.elements.players.length }`);
   }
}



class RoomList{  
   constructor(){
      this.head = null;
      this.size = 0;
   }


   /**
    * @returns {boolean} true if list is empty, else false
    */
   isEmpty(){
      return (this.head == null);
   }


   /**
    * adds element to end of the list
    * @param {Room} room 
    */
   add(room){
      /* if list is empty add to head */
      if (this.isEmpty()){
         this.head = room;
      }else{
         /* else traverse to tail and add */
         let temp = this.head;
         while(temp.next)
         {
            temp = temp.next;
         }
         temp.next = room;
      }

      /* update size of list and display */
      this.size++;
      this.display();
   }


   /**
    * @param {string} roomID 
    * @returns {Room | undefined} room of the given roomID or undefined if room not found
    */
   getRoom(roomID){
      let isFound = false;
      let temp = this.head;

      /* if list is empty */
      if(this.isEmpty()){
         return undefined;
      }

      /* loop to check all the room if it has the given roomID*/
      for (let i = 1; i <= this.size || temp != null; i++) {
         if(temp.elements.roomID == roomID){
            isFound = true;
            break;
         }
         temp = temp.next;
      }
      return (isFound)? temp: undefined;
   }

   
   /**
    * displays every node in the list
    */
   display(){
      let temp = this.head;
      while(temp)
      {
         console.log(temp.elements);
         temp = temp.next;
      }
      console.log(`size: ${ this.size }\n`)
   }


   /**
    * removes room with the given roomID from the list
    * @param {string} roomID 
    * @returns {boolean} true if the removal is successful, else false
    */
   remove(roomID){
      let roomToRemove = this.getRoom(roomID);

      /* check if room is not found */
      if(roomToRemove == undefined){
         return false;
      }

      /* check if room is in the head */
      if(roomToRemove == this.head){
         this.head = this.head.next;
      }else{
         /* if not in head */
         let predecessor = this.head;
         while(predecessor.next.elements.roomID != roomID){
            predecessor = predecessor.next;
         }
         predecessor.next = predecessor.next.next;
      }
      this.size--;
      return true;
   }
}

exports.Room = Room
exports.RoomList = RoomList
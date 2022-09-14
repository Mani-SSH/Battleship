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


class Room{
   constructor(){
      this.elements = {
         roomID: makeRoomID(),
         player_count: 0,
         players: []
      }
      this.next = null;
   }

   /**
    * @returns true if the rooom is full, else false
    */
   isFull(){
      return (this.elements.player_count >= MAX_PLAYER_PER_ROOM)? true: false;
   }

   /**
    * takes socket id of user and pushs it to players array
    * @param {string} sockedID
    * @returns true if new player has been added successfully, else false
    */
   addPlayer(sockedID){
      if(this.isFull()){
         return false;
      }else{
         this.elements.players.push(sockedID);
         this.elements.player_count++;
         this.display();
         return true;
      }
   }


   removePlayer(sockedID){
      this.elements.players = this.elements.players.filter((value) => {return value != sockedID});
      this.elements.player_count--;
   }



   /**
    * displays elements of room
    */
   display(){
      console.log(`Room: ${ this.elements.roomID }`)
      console.log(this.elements.players);
      console.log(`Player count: ${ this.elements.player_count }`);
   }
}



class RoomList{  
   constructor(){
      this.head = null;
      this.size = 0;
   }


   /**
    * @returns true if list is empty, else false
    */
   isEmpty(){
      return (this.head == null)? true: false;
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
    * @returns {Room} room of the given roomID or undefined if room not found
    */
   getRoom(roomID){
      let isFound = false;
      let temp = this.head;

      /* if list is empty */
      if(this.isEmpty()){
         return undefined;
      }

      /* loop to check all the room if it has the given roomID*/
      for (let i = 0; i <= this.size || temp != null; i++) {
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

exports.RoomList = RoomList;
exports.Room = Room;
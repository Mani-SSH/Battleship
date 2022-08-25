/* length of roomID */
const LENGTH_ROOMID = 6;

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
    * takes socket id of user and pushs it to players array
    * @param {string} sockedID
    */
   addPlayer(sockedID){
      this.elements.players.push(sockedID);
      this.elements.player_count++;
      this.display();
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
    * adds element to end of the list
    * @param {Room} room 
    */
    add(room){
      /* if list is empty add to head */
      if (this.head == null){
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
    * INCOMPLETE
    * adds player to a room
    * @param {string} roomID 
    * @param {string} playerID 
    */
   addPlayer(roomID, playerID){
      let temp = this.head;
      for (let i = 0; i <= this.size || temp != null; i++) {
         if(temp.elements.roomID === roomID){
            break;
         }
         temp = temp.next;
      }
      temp.addPlayer(playerID);
      this.display();
   }

   
   /**
    * displays every node in the list
    */
   display(){
      let temp = this.head;
      while(temp.next)
      {
         console.log(temp.elements);
         temp = temp.next;
      }
   }
}


exports.RoomList = RoomList;
exports.Room = Room;
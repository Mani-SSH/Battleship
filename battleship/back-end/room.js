/* length of roomID */
const LENGTH_ROOMID = 6;

class Room{
   constructor(){
      this.roomID = this.makeRoomID();
      this.frequency = 0;
      this.players = [];
   }


   /**
    * @returns 6 charactered roomID
    */
   makeRoomID() {
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < LENGTH_ROOMID; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
   }
   return result;
   }


   /**
    * takes socket id of user and pushs it to players array
    * @param {*} sockedID
    */
   addPlayer(sockedID){
      this.players.push(sockedID);
      this.frequency++;
      this.display();
   }


   /**
    * displays elements of room
    */
   display(){
      console.log(`Room: ${ this.roomID }`)
      console.log(this.players);
      console.log(`Frequency: ${ this.frequency }`);
   }
}




class Node{
   constructor(element){
      this.element = element;
      this.next = null;
   }
}




class LinkedList{
   constructor(){
      this.head = null;
      this.size = 0;
   }


   /**
    * adds element to end of the list
    * @param {*} element 
    */
   add(element){
      /* create new node */
      let node = new Node(element);

      /* if list is empty add to head */
      if (this.head == null){
         this.head = node;
      }else{
         /* else traverse to tail and add */
         let temp = this.head;
         while(temp.next)
         {
            temp = temp.next;
         }
         temp.next = node;
      }

      /* update size of list and display */
      this.size++;
      this.display();
   }

   /**
    * displays every node in the list
    */
   display(){
      let temp = this.head;
      while(temp.next)
      {
         console.log(temp.element);
         temp = temp.next;
      }
   }
}

exports.LinkedList = LinkedList;
exports.Room = Room;
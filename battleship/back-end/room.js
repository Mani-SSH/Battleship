/* length of roomID */
const LENGTH_ROOMID = 6;

class Room{
   constructor(){
      this.roomID = this.makeRoomID();
      this.amountPlayers = 0;
   }

   /**
    * 
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

   add(element){
      let node = new Node(element);
      if (this.head == null){
         this.head = node;
      }else{
         let temp = this.head;
         while(temp.next)
         {
            temp = temp.next;
         }
         temp.next = node;
      }
      this.size++;
   }

   display(){
      let temp = this.head;
      while(temp.next)
      {
         console.log(temp.element);
         temp = temp.next;
      }
   }
}

exports.Room = Room;
exports.LinkedList = LinkedList;
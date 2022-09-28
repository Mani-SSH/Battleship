export default class Player{
    constructor(name = "", tag = "", score = 0){
        this.name = name;
        this.tag = tag;
        this.id = this.name.concat('#', this.tag);
        this.score = score;
    }
}
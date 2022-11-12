export default class Player{
    constructor(name = "", tag = "", score = 0, password = ""){
        this.name = name;
        this.tag = tag;
        this.id = this.name.concat('#', this.tag);
        this.score = score;
        this.password = password
    }
}
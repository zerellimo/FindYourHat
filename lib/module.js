const prompt = require('prompt-sync')({sigint: true});

class Field {
    constructor() {
      
      this.hat = '^';
      this.hole = 'O';
      this.fieldCharacter = '░';
      this.pathCharacter = '*';
  
      this._realMap = [];
      this._bounds = {};
  
      this._username = 'Player';
      this._userMap = [];
      this._userPos = {};
  
      this._gameOver = false;
  
    }
  
    get username() {
      return this._username;
    }
  
    set username(username) {
      this._username = username;
    }
  
    generateField(height, width) {
  
      // sample
      /*
      this.realMap = [
        ['*', '░', 'O'],
        ['░', '░', '░'],
        ['░', '^', '░']
      ];
      */
  
      // auto
      for(let i=0;i<height;i++) {
        this.realMap[i] = new Array(width);
        this.userMap[i] = new Array(width);
        for (let j=0; j<width; j++) {
          this.realMap[i][j] = this.fieldCharacter;
          this.userMap[i][j] = this.fieldCharacter;
        }
      }
    
      this.setBounds();
      this.setUserPos();
  
      let randomIhat, randomJhat;
  
      // Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)
      
      do {
        randomIhat = Math.floor(Math.random()*(this.bounds.maxRow+1));
        randomJhat = Math.floor(Math.random()*(this.bounds.maxCol+1));
      } while (randomIhat === this.userPos.row || randomJhat === this.userPos.col)
  
      let hatPos = [randomIhat, randomJhat];
  
      this.realMap[randomIhat][randomJhat] = this.hat;
      
      let randomIhole, randomJhole  = 0;
      let holePos = [randomIhole, randomJhole];
  
      do {
        randomIhole = Math.floor(Math.random()*(this.bounds.maxRow+1));
        randomJhole = Math.floor(Math.random()*(this.bounds.maxRow+1));
        holePos = [randomIhole, randomJhole];
  
      } while (holePos === hatPos && (randomIhole === this.userPos.row || randomJhole === this.userPos.col))
  
      this.realMap[randomIhole][randomJhole] = this.hole;
      
    }
  
    print (map) {
      map.forEach((line)=>{
        console.log(line.join(''));
      });
    }
  
    get realMap() {
      return this._realMap;
    }
  
    set realMap(realMap){
      this._realMap = realMap;
    }
  
    get bounds(){
      return this._bounds;
    }
  
    set bounds(bounds){
      this._bounds = bounds;
    }
  
    setBounds(){
      this.bounds = {
        maxRow: this.realMap.length -1,
        maxCol: this.realMap[0].length -1
      }
      
    }
  
    get userMap(){
      return this._userMap;
    }
  
    set userMap(userMap){
      this._userMap = userMap;
    }
  
    get userPos() {
      return this._userPos;
    }
  
    set userPos(userPos) {
      this._userPos = userPos;
    }
  
    setUserPos() {
      this.userPos = {
        row: 0,
        col: 0
      }
      this.userMap[this.userPos.row][this.userPos.col] = this.pathCharacter;
    }
  
  
    start() {
  
      this.header();
  
      let ready;
      do {
        ready = prompt('Ready? (y/n) ');
        switch (ready) {
          case 'y':
            console.clear();
            this.print(this.userMap);
            break;
          case 'n':
            console.log(`See you later ${this.username}.`)
            return;
          default:
            break;
        }
      } while (ready != 'y' && ready != 'n')
  
      while(!this._gameOver) {
  
        this.getUserDirection();
        this.checkBounds();
  
        if (this._gameOver) {
          break;
        } else {
          this.checkWin();
        }
        
  
      }
  
    }
  
    header(){
  
      const name = prompt('What is your name? ');
      this.username = name;
      console.log(`Hey there ${name}.`);
      console.log('Find your hat! And beware of the holes...');
      
    }
  
    getUserDirection(){
  
      const direction = prompt('Direction? (up/down/right/left) ' );
        switch (direction) {
          case 'up':
            this.userPos.row -= 1;
            break;
          case 'down':
            this.userPos.row += 1;
            break;
          case 'right':
            this.userPos.col += 1;
            break;
          case 'left':
            this.userPos.col -= 1;
            break;
          default:
            break;
        }
  
    }
  
    checkBounds() {
  
      if (this.userPos.row<0 || this.userPos.row >this.bounds.maxRow || this.userPos.col <0 || this.userPos.col >this.bounds.maxCol) {
        console.log('Out of bounds. Game Over.')
        this._gameOver = true;
      } else {
        this._gameOver = false;
      }
  
    }
  
    checkWin() {
  
      if (this.realMap[this.userPos.row][this.userPos.col] === this.hat) {
        this.userMap[this.userPos.row][this.userPos.col] = this.realMap[this.userPos.row][this.userPos.col];
        this.print(this.userMap);
        console.log('Hat found. You Win!')
        this._gameOver = true;
      } else if (this.realMap[this.userPos.row][this.userPos.col] === this.hole) {
        this.userMap[this.userPos.row][this.userPos.col] = this.realMap[this.userPos.row][this.userPos.col];
        this.print(this.userMap);
        console.log('You fell in a hole. Game Over.');
        this._gameOver = true;
      } else {
        this.userMap[this.userPos.row][this.userPos.col] = this.pathCharacter;
        console.clear();
        this.print(this.userMap);
      }
  
    }
  }
  
  module.exports = Field;
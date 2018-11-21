widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = [1]
var users = [];
var userArray = [];

function setup(){
  createCanvas(widthClient,heightClient);
    background(230);
    fill(0);
      let centernode = new Node(window.innerWidth/2, window.innerHeight/2,50,50);
      nodes[0] = centernode;
}
function draw(){
  if(start ===true){
    background(230);
  //console.log(userName);
  // var testX = random(100, widthClient-100);
  // var testY = random(100, heightClient-100);
nodes[0].display();

}

}

function createNode(){
  for(var i = 0; i < userAmount; i++){
  nodes[i].push(ellipse(random(100, widthClient-100),random(100,heightClient-100),ellipseSize,ellipseSize));
}
}

function Node(x,y,r){
  this.x =x;
  this.y = y;
  this.r =r;

  this.display = function(){
    ellipse(this.x, this.y,this.r,this.r);
  }
}

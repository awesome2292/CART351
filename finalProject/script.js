widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = []
var users = [];
var assoc = [];
var xCoord = [];
var yCoord = [];

var displayNodes = false;

var ellipseSize = 20;

function setup(){
  var nodeCanvas = createCanvas(window.innerWidth,window.innerHeight);
    background(0);
    fill(255);
  // for (var i = 0; i < users.length; i++) {
  //   createNode();
  // }

}
function draw(){
  //let testNode = ellipse(window.innerWidth/2, window.innerHeight/2,50,50);
  // console.log(nodes.length);

  if(start ===true){
  background(0);
  //console.log(userName);
  // var testX = random(100, widthClient-100);
  // var testY = random(100, heightClient-100);

  // let centernode = new Node(window.innerWidth/2, window.innerHeight/2,50,50);
  // centernode.display();
    for(var i=0; i<nodes.length; i++) {
    nodes[i].display();
    }
    createNode();
    start=false;
    displayNodes =true;
  }

  if(displayNodes ==true){
    for(var i=0; i<nodes.length; i++) {
    nodes[i].display();
  }

  }

}

function createNode(){
  for(var i = 0; i < users.length; i++){
    nodes.push(new Node(users[i].xCoord,users[i].yCoord,ellipseSize,users[i].username));
  }
}

function Node(x,y,r,user){
  this.x = x;
  this.y = y;
  this.r =r;
  this.user = user;
  console.log(this.user);

  this.display = function(){
    ellipse(this.x, this.y,this.r,this.r);
  }

  this.clickNode = function(){
      if(Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) < this.r){
         console.log("This node is clicked");

         }
       }


}

function mousePressed(){
  for(var i = 0; i < nodes.length; i++){
    nodes[i].clickNode();
  }
}



function drawLine(){

}

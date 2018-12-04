widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = []
var users = [];
var assoc = [];
var xCoord = [];
var yCoord = [];
var hoverTexts = [];
var currentUser;
var currentUserX;
var currentUserY;
var currentUserR;
var connectionLine;
var nodeClicked = false;
var numClicks = 0;
var nodeColor;

var displayNodes = false;

var ellipseSize = 20;

function setup(){
  var nodeCanvas = createCanvas(window.innerWidth,window.innerHeight);
    background(0);

    //window.location.href="index.php?numClicks=0";

}
function draw(){
  if(start){
  background(0);
    createNode();
    start=false;
    displayNodes =true;
  }

  if(displayNodes ==true){
    currentUser.display();
    for(var i=0; i<nodes.length; i++) {
    nodes[i].display();
  }
  }

}

function createNode(){

  for(var i = 0; i < users.length; i++){
    if(users[i].username === userName){
      nodeColor = color(255,0,0);
      currentUserX = users[i].xCoord;
      currentUserY = users[i].yCoord;
      currentUser = new Node(currentUserX,currentUserY,ellipseSize,users[i].username, nodeColor, numClicks);
      console.log("The current user is " + users[i].username);
    }
    else{
      nodeColor = color(255);
    nodes.push(new Node(users[i].xCoord,users[i].yCoord,ellipseSize,users[i].username, nodeColor, numClicks));
  }
  }
}

function Node(x,y,r,user,clr,clicks,clicked){
  this.x = x;
  this.y = y;
  this.r =r;
  this.user = user;
  this.clr = clr;
  this.clicks = clicks;
  this.clicked = clicked;
  var mouseHover = false;
  console.log(this.user);

  this.display = function(strkWeight){
    this.strokeWeight = strkWeight;
    fill(this.clr);
    ellipse(this.x, this.y,this.r,this.r);
    if(this.clicked){
    this.strkWeight +=1;
    stroke(255);
    strokeWeight(this.strkWeight);
    line(currentUserX, currentUserY, this.x, this.y);
    }
  }

  this.clickNode = function(){

      if(Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) < this.r){
         console.log("This node is clicked");
         this.clicked = true;
         this.clicks+=1;
         console.log(this.clicks);
         this.r=this.r*(this.clicks/100+1);
         console.log(this.r);

         }
       }

    this.hoverNode = function(){
      if(Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) < this.r){
        fill(255);
        textSize(18);
        text(user, this.x - 30, this.y - 20);

      }
      else{
        fill(255,0,0);
        text("This is test text that should fucking disappear pls.", 50, 50);
      }
    }
}

function mousePressed(){
  for(var i = 0; i < nodes.length; i++){
    nodes[i].clickNode();
  }
}

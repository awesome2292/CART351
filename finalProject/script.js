widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = []
var users = [];
var assoc = [];
var displayNodes = false;

function setup(){
  createCanvas(widthClient,heightClient);
    background(0);
    fill(255);
      // //let centernode = new Node(window.innerWidth/2, window.innerHeight/2,50,50);
      // for(var i=0; i<users.length; i++) {
      //    if(users.length>nodes.length){
      //      moreUsersThanNodes = false;
      //      console.log(moreUsersThanNodes);
      //     createNode();
      //     console.log("there are nodes");
      //   assoc[users[i]] = nodes[i];
      // }
      // }
      // console.log("user array = " + assoc);

}
function draw(){
  //let testNode = ellipse(window.innerWidth/2, window.innerHeight/2,50,50);
  //console.log(testNode);

  if(start ===true){
  background(0);
  //console.log(userName);
  // var testX = random(100, widthClient-100);
  // var testY = random(100, heightClient-100);

  let centernode = new Node(window.innerWidth/2, window.innerHeight/2,50,50);
  centernode.display();
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
    var ellipseSize = 20;
    nodes.push(new Node(random(100, widthClient-100),random(100,heightClient-100),ellipseSize,users[i].username));
  }
}

function Node(x,y,r,user){
  this.x =x;
  this.y = y;
  this.r =r;
  this.user = user;
  console.log(this.user);

  this.display = function(){
    ellipse(this.x, this.y,this.r,this.r);
  }
}

widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = []
var users = ['yasmine', 'cat', 'sabine'];
var assoc = [];

function setup(){
  createCanvas(widthClient,heightClient);
    background(0);
    fill(255);
    let moreUsersThanNodes = true;
      //let centernode = new Node(window.innerWidth/2, window.innerHeight/2,50,50);
      for(var i=0; i<users.length; i++) {
        if(users.length>nodes.length){
          moreUsersThanNodes = false;
          console.log(moreUsersThanNodes);
          createNode();
          console.log(nodes[i]);
        assoc[users[i]] = nodes[i];
      }
      }
      console.log(assoc);

}
function draw(){
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

}

}

function createNode(){
  for(var i = 0; i < users; i++){
    var ellipseSize = 20;
  nodes[i].push(new Node(random(100, widthClient-100),random(100,heightClient-100),ellipseSize));
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

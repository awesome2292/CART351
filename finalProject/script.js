widthClient = window.innerWidth;
heightClient = window.innerHeight;
var nodes = []
var users = [];
var assoc = [];
var xCoord = [];
var yCoord = [];
var hoverTexts = [];
var lines = [];
var currentUser;
var currentUserX;
var currentUserY;
var currentUserR;
var connectionLines=[];
var nodeClicked = false;
var numClicks = 0;
var nodeColor;
let conn;


var displayNodes = false;

var ellipseSize = 20;

function setup(){
  var nodeCanvas = createCanvas(window.innerWidth,window.innerHeight);
    background(0);

          var fov = 500;
          var HALF_WIDTH = window.innerWidth/2;
          var HALF_HEIGHT = window.innerHeight/2;

          var numPoints = 1000;


          function draw3Din2D(point3d)
          {
              x3d = point3d[0];
              y3d = point3d[1];
              z3d = point3d[2];
              var scale = fov/(fov+z3d);
              var x2d = (x3d * scale) + HALF_WIDTH;
              var y2d = (y3d * scale)  + HALF_HEIGHT;


              c.lineWidth= scale/4;
              c.strokeStyle = "rgb(255,255,255)";
              c.beginPath();
              c.moveTo(x2d,y2d);
              c.lineTo(x2d+scale,y2d);
              c.stroke();

          }

          var c = canvas.getContext('2d');
          var points = [];
          function initPoints()
          {
              for (i=0; i<numPoints; i++)
              {
                  point = [(Math.random()*400)-200, (Math.random()*400)-200 , (Math.random()*400)-200 ];
                  points.push(point);
              }
          }
          function render()
          {
              c.save();
              c.clearRect(0, 0, canvas.width, canvas.height);

              for (i=0; i<numPoints; i++)
              {
                  point3d = points[i];

                  z3d = point3d[2];
                  z3d-=4;
                  if(z3d<-fov) z3d +=400;
                  point3d[2] = z3d;

                  draw3Din2D(point3d);
              }
              c.restore();
          }
          initPoints();

          var loop = setInterval(function(){render();}, 50);


}
function draw(){
  if(start){
  background(0);
    createNode();
    //createLines();
    start=false;
    displayNodes =true;
  }
  if(displayNodes ==true){
    //  for(let i =0;i<connectionLines.length;i++){
    //   console.log(connectionLines[i]);
    // }
    currentUser.display();
    for(var i=0; i<nodes.length; i++) {
    nodes[i].display();
    nodes[i].hoverNode();
  }
//   for(var i=0; i<lines.length; i++) {
//   lines[i].display();
// }
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

// function createLines(){
//  stroke(255);
// //console.log("conn.NodeA_x = " + conn.NodeA_x);
//  lines.push(new Line(random(0,100), random(0,100), random(0,300), random(0,300)));
// }

function Line(x1,y1,x2,y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.display = function(){
    line(this.x1, this.y1, this.y2, this.y2);
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

  this.display = function(){
    fill(this.clr);
    noStroke();
    ellipse(this.x, this.y,this.r,this.r);
    if(this.clicked){
    stroke(255);
    line(currentUserX, currentUserY, this.x, this.y);}
    }

  this.clickNode = function(){
      if(Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) < this.r){
         //console.log("This node is clicked");
         this.clicked = true;
         // add to array::
         conn ={
           "NodeA_x":currentUserX,
            "NodeA_y":currentUserY,
            "NodeB_x":this.x,
             "NodeB_y":this.y};
         connectionLines.push(conn);
         this.clicks+=1;
         console.log(this.clicks);
         if(this.r<85){
         this.r=this.r*(this.clicks/100+1);
       }
         console.log(this.r);
         }
       }
    this.hoverNode = function(){
      if(Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) < this.r){
        fill(255);
        noStroke();
        textSize(18);
        text(user, this.x - 30, this.y - (this.r));
      }
    }
}



function mousePressed(){
  for(var i = 0; i < nodes.length; i++){
    nodes[i].clickNode();
  }
}

function SaveJSON(){
  $.ajax
  ({
    type:'POST',
    url:'saveToJSON.php',
    data: { data: JSON.stringify(connectionLines)},
    success: function(response)
    {console.log(response)},
    failure: function(response)
    {console.log(response)}
  });
};

function storeUser() {
    return $.ajax({
        type: "GET",
        url: "connections.json",
        dataType: "text"
    });
}

if ( ! localStorage.getItem('conn') ) {
    storeUser().done(function(json) {
        conn = JSON.parse( json );
        localStorage.setItem('conn', json);
    });
}else{
    conn = JSON.parse( localStorage.getItem('conn') );
        console.log(conn);
}
window.onload = function(){
  storeUser();
//  $.getJSON('connections.json', function(data) {
    console.log("entered get");
       //success
         //step 1: console.log the result
         // currentUserX = conn.NodeA_x;
         // console.log("currentUserX = " + currentUserX);
         // currentUserY = conn.NodeA_y;
         // conn.NodeB_x = this.x;
         // conn.NodeB_y = this.y;
  //         })
         // .fail(function() {
         //   console.log( "error" );
         // });
};

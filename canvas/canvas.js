var cvs = document.getElementById('canvas');
var c = cvs.getContext('2d');

var inter = setInterval(draw, 33);
a = new Array();
appendindex = 0;
SPEED = 2;
PARTICLE_SIZE = [8, 8];
CANVAS_SIZE = [400, 400];
FRONTCOLOR = "rgba(0,0,0,1)"
BACKCOLOR = "rgba(255,255,255,1)"
gradient = null;
generation=0;

//particle = {
//    x,
//    y,
//    dx,
//    dy,
//    sx,
//    sy,
//};

function init() {
  //  gradient = c.createRadialGradient(0, 0, 100, 300, 300, 600);
  //  gradient.addColorStop(0, "rgba(255,255,255,1)");
  //  gradient.addColorStop(0.3, "rgba(200,0,0,1)");
  //  gradient.addColorStop(0.6, "rgba(100,0,0,1)");
  //  gradient.addColorStop(0.9, "rgba(0,0,0,1)");
  //  c.fillStyle = gradient;
  //  c.fillRect(0,0,600,600);
  c.strokeRect(0,0,CANVAS_SIZE[0],CANVAS_SIZE[1]);
}

function generate(count) {
  for(var i = 0; i < count; i++) {
    a.push({x:200, y:0, dx:1, dy:SPEED, sx:PARTICLE_SIZE[0], sy:PARTICLE_SIZE[1]});
  }
}

function printPoint(point) {
  return "[" + point[0] + "," + point[1] + "]";
}

function clear() {
  c.fillStyle = BACKCOLOR;
  for(var i = 0; i < a.length; i++) {
    c.fillRect(a[i].x, a[i].y, PARTICLE_SIZE[0], PARTICLE_SIZE[1]);
  }
}

function drawParticle(pos) {
  gradient = c.createRadialGradient(pos.x+PARTICLE_SIZE[0], pos.y+PARTICLE_SIZE[1], PARTICLE_SIZE[0]/4, pos.x+PARTICLE_SIZE[0], pos.y+PARTICLE_SIZE[1], PARTICLE_SIZE[0]);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
//  gradient.addColorStop(0.4, "rgba(0,0,0,0.3)");
  gradient.addColorStop(0, "rgba(0,0,0,0.5)");
  c.fillStyle = gradient;
  c.fillRect(pos.x,pos.y,PARTICLE_SIZE[0]*4,PARTICLE_SIZE[1]*4);
}

function compute() {
  wind = {
    dx:0,
    dy:0
  };
  wind.dx += (Math.random() - 0.6);
  wind.dy += (Math.random() - 0.4);
  for(var i = 0; i < a.length; i++) {
    a[i].dx = (a[i].dx + wind.dx + (Math.random() - 0.5)*0.3);
    a[i].dy = (a[i].dy + wind.dy + (Math.random() - 0.4));
    a[i].x += Math.round(a[i].dx);
    a[i].y += Math.round(a[i].dy);

    if(a[i].x >= CANVAS_SIZE[0] || a[i].y >= CANVAS_SIZE[1]) {
      a.splice(i, 1);
    }
  }
}

function move() {
  for(var i = 0; i < a.length; i++) {
    //c.fillRect(a[i].x, a[i].y, PARTICLE_SIZE[0], PARTICLE_SIZE[1]);
    drawParticle(a[i]);
  }
}

function draw() {
  generate(10);
  //clear();
  c.clearRect(0, 0, 400, 400);
  compute();
  move();
}

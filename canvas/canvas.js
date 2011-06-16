var cvs = document.getElementById('canvas');
var c = cvs.getContext('2d');
var fps = null;

a = new Array();

Simulation = {
  lastcall : mozAnimationStartTime,
  framecount : 0,
  timespent : 0,
  maxParticle : 500,
  particleData : new Image(),
  appendindex : 0,
  speed : 0.5,
  particleSize : {
    x : 16,
    y : 16
  },
  canvasSize : {
    x : 400,
    y : 400
  },
  generation : 0,
  wind : {
    dx:0.5,
    dy:0.5
  },
};

function init() {
  Simulation.particleData.src = 'sprite.png';
  fps = document.getElementById('fps');
  mozRequestAnimationFrame(draw);
}

var index = 0;
function generate(count) {
  for(var i = 0; i < count; i++) {
    ++index;
    if(a.length < Simulation.maxParticle) {
      a.push({
        x:200,
        y:200,
        dx:Simulation.speed,
        dy:Simulation.speed,
        sx:Simulation.particleSize.x,
        sy:Simulation.particleSize.y});
    } else {
      a[index % Simulation.maxParticle].x = 200;
      a[index % Simulation.maxParticle].y = 200;
      a[index % Simulation.maxParticle].dx = Simulation.speed;
      a[index % Simulation.maxParticle].dy = Simulation.speed;
    }
  }
}

function drawParticle(p) {
  c.drawImage(Simulation.particleData, p.x, p.y);
}

function changeWind() {
  Simulation.wind.dx = (Simulation.wind.dx + (Math.random() - 0.6)) % 1;
  Simulation.wind.dy = (Simulation.wind.dx + (Math.random() - 0.4)) % 1;
}

function compute() {
  for(var i = 0; i < a.length; i++) {
    a[i].dx = (a[i].dx + Simulation.wind.dx + (Math.random() - 0.5));
    a[i].dy = (a[i].dy + Simulation.wind.dy + (Math.random() - 0.5));
//    a[i].x += (a[i].dx + 0.5) | 0;
//    a[i].y += (a[i].dy + 0.5) | 0;
    a[i].x += Math.round(a[i].dx);
    a[i].y += Math.round(a[i].dy);

//    if(a[i].x >= Simulation.canvasSize.x || a[i].y >= Simulation.canvasSize.y) {
//      a.splice(i, 1);
//    }
  }
}

function move() {
  for(var i = 0; i < a.length; i++) {
    drawParticle(a[i]);
  }
}

var w = 0;
function draw(timeStamp) {
  var dt = timeStamp - Simulation.lastcall;
  Simulation.timespent+=dt;
  Simulation.framecount++;
  Simulation.lastcall = timeStamp;

  generate(20);
  c.clearRect(0, 0, Simulation.canvasSize.x, Simulation.canvasSize.y);
  compute();
  move();
  mozRequestAnimationFrame(draw);
  if(Simulation.timespent >= 1000) {
    fps.innerHTML = "FPS : " + Simulation.framecount/Simulation.timespent * 1000;
    Simulation.timespent = 0;
    Simulation.framecount = 0;
  }
  if(w++ >= 400) {
    changeWind();
    if(w>=420)
      w=0;
  }
}


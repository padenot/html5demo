var cvs = document.getElementById('canvas');
var c = cvs.getContext('2d');

a = new Array();

Simulation = {
  interval : 33,
  callback : setInterval(draw, this.interval),
  appendindex : 0,
  speed : 2,
  particleSize : {
    x : 8,
    y: 8
  },
  canvasSize : {
    x : 400,
    y : 400
  },
  generation : 0,
  wind : {
    dx:0,
    dy:0
  },
};

function init() {
  c.strokeRect(0,0,Simulation.canvasSize.x,Simulation.canvasSize.y);
}

function generate(count) {
  for(var i = 0; i < count; i++) {
    a.push({x:200,
            y:200,
            dx:1,
            dy:Simulation.speed,
            sx:Simulation.particleSize.x,
            sy:Simulation.particleSize.y});
  }
}

function drawParticle(pos) {
  gradient = c.createRadialGradient(pos.x+Simulation.particleSize.x,
                                    pos.y+Simulation.particleSize.y,
                                    Simulation.particleSize.x/2,
                                    pos.x+Simulation.particleSize.x,
                                    pos.y+Simulation.particleSize.y,
                                    Simulation.particleSize.x);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  gradient.addColorStop(0, "rgba(100,100,100,0.5)");
  c.fillStyle = gradient;
  c.fillRect(pos.x,pos.y,Simulation.particleSize.x*4,Simulation.particleSize.y*4);
}

function compute() {
  Simulation.wind.dx = (Simulation.wind.dx + (Math.random() - 0.6)) % 1;
  Simulation.wind.dy = (Simulation.wind.dx + (Math.random() - 0.4)) % 1;
  for(var i = 0; i < a.length; i++) {
    a[i].dx = (a[i].dx + Simulation.wind.dx + (Math.random() - 0.5)*0.3);
    a[i].dy = (a[i].dy + Simulation.wind.dy + (Math.random() - 0.4));
    a[i].x += Math.round(a[i].dx);
    a[i].y += Math.round(a[i].dy);

    if(a[i].x >= Simulation.canvasSize.x || a[i].y >= Simulation.canvasSize.y) {
      a.splice(i, 1);
    }
  }
}

function move() {
  for(var i = 0; i < a.length; i++) {
    drawParticle(a[i]);
  }
}

function draw() {
  generate(10);
  c.clearRect(0, 0, Simulation.canvasSize.x, Simulation.canvasSize.y);
  compute();
  move();
}


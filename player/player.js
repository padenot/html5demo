// The state of the player : paused or playing
var state = 'paused';

function addEvent() {
	var v = document.getElementById("player");
	v.addEventListener('loadedmetadata', metadataLoaded, true);
	v.addEventListener("timeupdate", drawBar, true);  
	var div = document.getElementById("button");
	div.style.cursor = 'pointer';
	div.onlick = function() {
	    var v = document.getElementById("player").pause();
	}
	drawPlaying();
	drawBar();
}

function time_format(time)
{
    //document.getElementById("played").firstChild.nodeValue=time;
    return zero_padding(roundNumber(time/60,0),1)+ ":" +
	zero_padding(roundNumber(time%60,0),1);
}

function zero_padding(num,count)
{
    var toReturn = num + '';
    while(toReturn.length <= count) {
	toReturn = "0" + toReturn;
    }
    return toReturn;
}

function drawBar() {
	var audio = document.getElementById("player");
	var current_time = audio.currentTime;
	var total = audio.duration;
	if(state = 'playing')
	{
	    draw(current_time, total);
	   document.getElementById("played").firstChild.nodeValue=time_format(current_time) + " / " + time_format(total);
	}
}

function draw(len, total) {  
	var canvas = document.getElementById("canvas");  
	var ctx = canvas.getContext("2d");  

	var my_gradient = ctx.createLinearGradient(0, 0, 200, 0);
	my_gradient.addColorStop(0, "white");
	my_gradient.addColorStop(1, "gray");
	ctx.clearRect(0,0,200,24);
	ctx.fillStyle = my_gradient;
	drawRoundedRectangle(ctx, 0, 0, len/total*200, 24, 8);
}  

function roundNumber(rnum, rlength) {
  return Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
}

function metadataLoaded() {
    var audio =  document.getElementById("player");
    document.getElementById("duration").firstChild.nodeValue = roundNumber(audio.duration,0);
}

function drawPaused() {
var ctxt = document.getElementById("icon").getContext("2d");
	ctxt.clearRect(0,0,32,32);
	ctxt.fillStyle = "rgb(255,255,255)";
	ctxt.fillRect (8,8, 5, 16);  
	ctxt.fillRect (20,8, 5, 16);  
}

function drawPlaying() {
var ctxt = document.getElementById("icon").getContext("2d");
	ctxt.clearRect(0,0,32,32);
	ctxt.fillStyle = "rgb(255,255,255)";
	ctxt.moveTo(8,8);  
	ctxt.lineTo(24, 16);  
	ctxt.lineTo(8, 24);  
	ctxt.lineTo(8,8);  
	ctxt.fill();
}

function drawRoundedRectangle(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	/* If the rectangle is too narrow, this lower the corner radius
	 * for a more pleasing visual effect */
	if(width < radius)
	{
	    radius = width;
	}
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
	ctx.fill();
}

function toggle() {
var player = document.getElementById("player");
var button = document.getElementById("button");
    if(state == 'paused')
    {
	player.play();
	drawPaused();
	state = 'playing';
    }
    else if(state == 'playing')
    {
	player.pause();
	drawPlaying();
	state = 'paused';
    }
}


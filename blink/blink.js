var old_heart = -Math.PI/2;
var old_earth = -Math.PI/2;
var heart = document.querySelector("#heart");
var earth = document.querySelector("#earth");
var txtShadow = '0.02em 0.02em 0.01em rgba(50,50,50,';

function init() {
  mozRequestAnimationFrame(change);
}

function change() {
  old_heart+=0.02;
  var alpha_exp = Math.abs(Math.exp(Math.sin(old_heart)) - 1/Math.E) / (Math.E - 1/Math.E);
  heart.style.color = 'rgba(0,0,0,'+alpha_exp+')';
  heart.style.textShadow = txtShadow + alpha_exp + ')';
  old_earth+=0.02;
  var alpha_lin =(Math.sin(old_earth) + 1) / 2;
  earth.style.color = 'rgba(0,0,0,'+alpha_lin+')';
  earth.style.textShadow = txtShadow + alpha_lin + ')';
  mozRequestAnimationFrame(change);
}

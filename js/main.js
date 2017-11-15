
var c = document.getElementById("progressBar");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.strokeStyle="rgba(109, 109, 120, .5)";
ctx.arc(100,100,50,0,2*Math.PI);
ctx.font="16px Kaushan Script";
ctx.fillText("0%", 90, 105);
ctx.stroke();

function oneQuarter() {
  ctx.beginPath();
  ctx.strokeStyle="#05bcc1";
  ctx.arc(100,100,50,5,2*Math.PI);
  ctx.fillText("20%", 90, 105);
  ctx.stroke();
};

function twoQuarter() {
  ctx.beginPath();
  ctx.strokeStyle="#05bcc1";
  ctx.arc(100,100,50,4,2*Math.PI);
  ctx.stroke();
};



c.addEventListener('click', oneQuarter);







/**
ctx.arc(200,100,50,0,2*Math.PI); **/

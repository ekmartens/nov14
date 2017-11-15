
var c = document.getElementById("progressBar");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.strokeStyle="rgba(109, 109, 120, .5)";
ctx.lineWidth=20;
ctx.shadowBlur=10;
ctx.shadowColor="white";
ctx.arc(150,100,80,0,2*Math.PI);
ctx.font="16px Kaushan Script";
ctx.fillText("0%", 140, 105);
ctx.stroke();

function resetCanv() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.strokeStyle="rgba(109, 109, 120, .5)";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.stroke();
}

function oneFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,5,2*Math.PI);
  ctx.fillText("20%", 85, 105);
  ctx.stroke();
};

function twoFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,4,2*Math.PI);
  ctx.fillText("40%", 85, 105);
  ctx.stroke();
};

function threeFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,2,2*Math.PI);
  ctx.fillText("60%", 85, 105);
  ctx.stroke();
};

function fourFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,1,2*Math.PI);
  ctx.fillText("80%", 85, 105);
  ctx.stroke();
};

function fiveFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.shadowBlur=20;
  ctx.shadowColor="white";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.fillText("100%", 82, 105);
  ctx.stroke();
};

var button1 = document.getElementById('firstMilestone');
var button2 = document.getElementById('secondMilestone');
var button3 = document.getElementById('thirdMilestone');
var button4 = document.getElementById('fourthMilestone');
var button5 = document.getElementById('fifthMilestone');

button1.addEventListener('click', oneFifth);
button2.addEventListener('click', twoFifth);
button3.addEventListener('click', threeFifth);
button4.addEventListener('click', fourFifth);
button5.addEventListener('click', fiveFifth);







/**
ctx.arc(200,100,50,0,2*Math.PI); **/

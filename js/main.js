/** Progress Bar **/

var c = document.getElementById("progressBar");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.strokeStyle="rgba(109, 109, 120, .5)";
ctx.lineWidth=20;
ctx.shadowBlur=10;
ctx.shadowColor="white";
ctx.arc(100,100,80,0,2*Math.PI);
ctx.font="24px Kaushan Script";
ctx.fillText("0%", 87, 107);
ctx.stroke();

function resetCanv() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.strokeStyle="rgba(109, 109, 120, .5)";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.stroke();
}

function resetScore(){
  resetCanv();
  ctx.beginPath();
  ctx.font="24px Kaushan Script";
  ctx.fillText("0%", 87, 107);
  ctx.stroke();
}

function oneFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,5,2*Math.PI);
  ctx.fillText("20%", 76, 105);
  ctx.stroke();
};

function twoFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,4,2*Math.PI);
  ctx.fillText("40%", 75, 105);
  ctx.stroke();
};

function threeFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,2,2*Math.PI);
  ctx.fillText("60%", 75, 105);
  ctx.stroke();
};

function fourFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,1,2*Math.PI);
  ctx.fillText("80%", 75, 105);
  ctx.stroke();
};

function fiveFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.shadowBlur=20;
  ctx.shadowColor="white";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.fillText("100%", 73, 105);
  ctx.stroke();
};

var button1 = document.getElementById('firstMilestone');
var button2 = document.getElementById('secondMilestone');
var button3 = document.getElementById('thirdMilestone');
var button4 = document.getElementById('fourthMilestone');
var button5 = document.getElementById('fifthMilestone');
var resetButton = document.getElementById('reset');

button1.addEventListener('click', oneFifth);
button2.addEventListener('click', twoFifth);
button3.addEventListener('click', threeFifth);
button4.addEventListener('click', fourFifth);
button5.addEventListener('click', fiveFifth);
resetButton.addEventListener('click', resetScore);

/** End Progress Bar **/

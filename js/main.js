/** Progress Bar **/
var levelText = document.getElementById('levelText');
var numLevel = 1;

function updateLevel() {
  levelDisplay = "Level " + numLevel;
  levelText.innerText = levelDisplay;
}

var dollars = document.getElementById('yourDollars');
var numDollars = 0;
var moneyDisplay;


function updateMoney() {
  numDollars = numDollars + (19 + numLevel);
  moneyDisplay = "$ " + numDollars;
  dollars.innerText = moneyDisplay;
}

function levelUpMoney() {
  numDollars = numDollars + (100*numLevel);
  moneyDisplay = "$ " + numDollars;
  dollars.innerText = moneyDisplay;
}

var c = document.getElementById("progressBar");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.strokeStyle="rgba(109, 109, 120, .5)";
ctx.lineWidth=20;
ctx.shadowBlur=10;
ctx.shadowColor="white";
ctx.arc(100,100,80,0,2*Math.PI);
ctx.font="24px Kaushan Script";
ctx.fillText("$0", 87, 107);
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
  ctx.fillText("$0", 87, 107);
  ctx.stroke();
}

function oneFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,5,2*Math.PI);
  ctx.fillText("$" + (19 + numLevel), 76, 105);
  ctx.stroke();
  updateMoney();
};

function twoFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,4,2*Math.PI);
  ctx.fillText("$" + 2*(19 + numLevel), 75, 105);
  ctx.stroke();
  updateMoney();
};

function threeFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,2,2*Math.PI);
  ctx.fillText("$" + 3*(19 + numLevel), 75, 105);
  ctx.stroke();
  updateMoney();
};

function fourFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,1,2*Math.PI);
  ctx.fillText("$" + 4*(19 + numLevel), 75, 105);
  ctx.stroke();
  updateMoney();
};

function fiveFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.shadowBlur=20;
  ctx.shadowColor="white";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.fillText("$" + ((4*(19 + numLevel))+(100 * numLevel)), 73, 105);
  ctx.stroke();
  levelUpConfetti();
  levelUpMoney();
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

/** Confetti **/

var bonusCash = document.getElementById('bonusCash');

function updateBonus(){
  bonusCashMessage = "+$" + (100 * numLevel);
  bonusCash.innerText = bonusCashMessage;
};


function levelUpConfetti() {
  var congratulationsContainer = document.getElementById('confetti-container');

  congratulationsContainer.style.display = "block";
  confettiBadge();
    // globals
    var canvas;
    var contx;
    var W;
    var H;
    var mp = 150; //max particles
    var particles = [];
    var angle = 0;
    var tiltAngle = 0;
    var confettiActive = true;
    var animationComplete = true;
    var deactivationTimerHandler;
    var reactivationTimerHandler;
    var animationHandler;

    // objects

    var particleColors = {
        colorOptions: ["DodgerBlue", "yellow", "magenta", "coral", "#05bcc1", "blue", "Indigo", "green", "orange", "SandyBrown", "darkred", "Crimson"],
        colorIndex: 0,
        colorIncrementer: 0,
        colorThreshold: 10,
        getColor: function () {
            if (this.colorIncrementer >= 10) {
                this.colorIncrementer = 0;
                this.colorIndex++;
                if (this.colorIndex >= this.colorOptions.length) {
                    this.colorIndex = 0;
                }
            }
            this.colorIncrementer++;
            return this.colorOptions[this.colorIndex];
        }
    }

    function confettiParticle(color) {
        this.x = Math.random() * W; // x-coordinate
        this.y = (Math.random() * H) - H; //y-coordinate
        this.r = RandomFromTo(10, 30); //radius;
        this.d = (Math.random() * mp) + 10; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;

        this.draw = function () {
            contx.beginPath();
            contx.lineWidth = this.r / 2;
            contx.strokeStyle = this.color;
            contx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            contx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            return contx.stroke();
        }
    }

    $(document).ready(function () {
        SetGlobals();
        InitializeButton();
        InitializeConfetti();

        $(window).resize(function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });

    });

    function InitializeButton() {
        $('#stopButton').click(DeactivateConfetti);
        $('#startButton').click(RestartConfetti);
    }

    function SetGlobals() {
        canvas = document.getElementById("canvas");
        contx = canvas.getContext("2d");
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    }

    function InitializeConfetti() {
        particles = [];
        animationComplete = false;
        for (var i = 0; i < mp; i++) {
            var particleColor = particleColors.getColor();
            particles.push(new confettiParticle(particleColor));
        }
        StartConfetti();
    }

    function Draw() {
        contx.clearRect(0, 0, W, H);
        var results = [];
        for (var i = 0; i < mp; i++) {
            (function (j) {
                results.push(particles[j].draw());
            })(i);
        }
        Update();

        return results;
    }

    function RandomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }


    function Update() {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[i];
            if (animationComplete) return;

            if (!confettiActive && particle.y < -15) {
                particle.y = H + 100;
                continue;
            }

            stepParticle(particle, i);

            if (particle.y <= H) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i);
        }

        if (remainingFlakes === 0) {
            StopConfetti();
        }
    }

    function CheckForReposition(particle, index) {
        if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
            if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
            {
                repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 20);
            } else {
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    repositionParticle(particle, -20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                } else {
                    //Enter from the right
                    repositionParticle(particle, W + 20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                }
            }
        }
    }
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }

    function StartConfetti() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        (function animloop() {
            if (animationComplete) return null;
            animationHandler = requestAnimFrame(animloop);
            return Draw();
        })();
    }

    function ClearTimers() {
        clearTimeout(reactivationTimerHandler);
        clearTimeout(animationHandler);
    }

    function DeactivateConfetti() {
        confettiActive = false;
        ClearTimers();
    }

    function StopConfetti() {
        animationComplete = true;
        if (contx == undefined) return;
        contx.clearRect(0, 0, W, H);
    }

    function RestartConfetti() {
        ClearTimers();
        StopConfetti();
        reactivationTimerHandler = setTimeout(function () {
            confettiActive = true;
            animationComplete = false;
            InitializeConfetti();
        }, 100);

    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };

    })();

setTimeout (function endLevelUp() {
    DeactivateConfetti();
    if (numLevel === 1){
      badgeLevel1();
    } else if (numLevel === 2) {
      badgeLevel2();
    } else if (numLevel === 3) {
      badgeLevel3();
    } else if (numLevel === 4) {
      badgeLevel4();
    } else if (numLevel === 5){
      badgeLevel5();
    } else if (numLevel === 6){
      badgeLevel6();
    } else if (numLevel === 7){
      badgeLevel7();
    } else if (numLevel === 8){
      badgeLevel8();
    } else if (numLevel === 9){
      badgeLevel9();
    } else if (numLevel === 10){
      badgeLevel10();
    }

}, 3000);

setTimeout (function hideLevelUp() {
  congratulationsContainer.style.display = "none";
  numLevel = numLevel + 1;
  updateLevel();
  resetScore();
  updateBonus();

}, 5000);

};


/** Function

When a happens trigger oneFifth
When b happens trigger twoFifth
etc.

when f happens trigger end level + reward
resetScore();

**/

/** Load Reward Canvas**/
var confettiBadge = function() {
  var confettiPic=document.getElementById("confettiRewardCanv");
  var confctx=confettiPic.getContext("2d");
  var img=document.getElementById("reward");
  confctx.drawImage(img,10,10);
}

var badgeLevel1 = function() {
    var pic=document.getElementById("rewardCanv");
    var picctx=pic.getContext("2d");
    var img=document.getElementById("reward1");
    picctx.drawImage(img,10,10);
    picctx.font="60px Kaushan Script";
    picctx.beginPath();
    picctx.fillText("1", 100, 100);
    picctx.stroke();
  };

var badgeLevel2 = function(){
    var pic2=document.getElementById("rewardCanv2");
    var pic2ctx=pic2.getContext("2d");
    var img=document.getElementById("reward2");
    pic2ctx.drawImage(img,10,10);
    pic2ctx.font="60px Kaushan Script";
    pic2ctx.beginPath();
    pic2ctx.fillText("2", 100, 100);
    pic2ctx.stroke();
  };

  var badgeLevel3 = function(){
    var pic3=document.getElementById("rewardCanv3");
    var pic3ctx=pic3.getContext("2d");
    var img=document.getElementById("reward3");
    pic3ctx.drawImage(img,10,10);
    pic3ctx.font="60px Kaushan Script";
    pic3ctx.beginPath();
    pic3ctx.fillText("3", 100, 100);
    pic3ctx.stroke();
};

var badgeLevel4 = function(){
  var pic4=document.getElementById("rewardCanv4");
  var pic4ctx=pic4.getContext("2d");
  var img=document.getElementById("reward4");
  pic4ctx.drawImage(img,10,10);
  pic4ctx.font="60px Kaushan Script";
  pic4ctx.beginPath();
  pic4ctx.fillText("4", 100, 100);
  pic4ctx.stroke();
};

var badgeLevel5 = function(){
  var pic5=document.getElementById("rewardCanv5");
  var pic5ctx=pic5.getContext("2d");
  var img=document.getElementById("reward5");
  pic5ctx.drawImage(img,10,10);
  pic5ctx.font="60px Kaushan Script";
  pic5ctx.beginPath();
  pic5ctx.fillText("5", 100, 100);
  pic5ctx.stroke();
};

var badgeLevel6 = function(){
  var pic6=document.getElementById("rewardCanv6");
  var pic6ctx=pic6.getContext("2d");
  var img=document.getElementById("reward6");
  pic6ctx.drawImage(img,10,10);
  pic6ctx.font="60px Kaushan Script";
  pic6ctx.beginPath();
  pic6ctx.fillText("6", 100, 100);
  pic6ctx.stroke();
};

var badgeLevel7 = function(){
  var pic7=document.getElementById("rewardCanv7");
  var pic7ctx=pic7.getContext("2d");
  var img=document.getElementById("reward7");
  pic7ctx.drawImage(img,10,10);
  pic7ctx.font="60px Kaushan Script";
  pic7ctx.beginPath();
  pic7ctx.fillText("7", 100, 100);
  pic7ctx.stroke();
};

var badgeLevel8 = function(){
  var pic8=document.getElementById("rewardCanv8");
  var pic8ctx=pic8.getContext("2d");
  var img=document.getElementById("reward8");
  pic8ctx.drawImage(img,10,10);
  pic8ctx.font="60px Kaushan Script";
  pic8ctx.beginPath();
  pic8ctx.fillText("8", 100, 100);
  pic8ctx.stroke();
};

var badgeLevel9 = function(){
  var pic9=document.getElementById("rewardCanv9");
  var pic9ctx=pic9.getContext("2d");
  var img=document.getElementById("reward9");
  pic9ctx.drawImage(img,10,10);
  pic9ctx.font="60px Kaushan Script";
  pic9ctx.beginPath();
  pic9ctx.fillText("9", 100, 100);
  pic9ctx.stroke();
};

var badgeLevel10 = function(){
  var pic9=document.getElementById("rewardCanv9");
  var pic9ctx=pic9.getContext("2d");
  var img=document.getElementById("reward9");
  pic9ctx.drawImage(img,10,10);
  pic9ctx.font="60px Kaushan Script";
  pic9ctx.beginPath();
  pic9ctx.fillText("9", 100, 100);
  pic9ctx.stroke();
};

var badgeLevel10 = function(){
  var pic10=document.getElementById("rewardCanv10");
  var pic10ctx=pic10.getContext("2d");
  var img=document.getElementById("reward10");
  pic10ctx.drawImage(img,10,10);
  pic10ctx.font="60px Kaushan Script";
  pic10ctx.beginPath();
  pic10ctx.fillText("10", 85, 100);
  pic10ctx.stroke();
};


function badgeTest(){
  badgeLevel1();
  badgeLevel2();
  badgeLevel3();
  badgeLevel4();
  badgeLevel5();
  badgeLevel6();
  badgeLevel7();
  badgeLevel8();
  badgeLevel9();
  badgeLevel10();
};

/** Character Picker **/

var modal = document.getElementById('characterModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function showModal() {
    modal.style.display = "block";
};

var firstPick = document.getElementById('character1');
var secondPick = document.getElementById('character2');
var avatar1 = document.getElementById('avatar');
var avatar2 = document.getElementById('avatar2');
var characterPicked = false;

function closeModal() {
  modal.style.display = "none";
};

function setAvatar1() {
  characterPicked = true;
  avatar1.style.display = "block";
  avatar2.style.display = "none";
};

function setAvatar2() {
  characterPicked = true;
  avatar2.style.display = "block";
  avatar1.style.display = "none";
};

firstPick.addEventListener('click', setAvatar1);
secondPick.addEventListener('click', setAvatar2);

$(function(){
    $("#my-form").submit(function(e) { // change # to .
        var value = $("#input_name").val(); // you should have #input_name

        $('#yourName').text(value); // text function takes value as parameter
        e.preventDefault();
        if ( characterPicked == false){
          alert("Please choose a character.");
        } else {
          closeModal();
        }

    });
});

submitBtn.addEventListener('click', setPlayerName);

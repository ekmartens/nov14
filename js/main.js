/** Progress Bar **/
var levelText = document.getElementById('levelText');
var numLevel = 1

function updateLevel() {
levelDisplay = "Level " + numLevel;
levelText.innerText = levelDisplay;
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
  ctx.fillText("$20", 76, 105);
  ctx.stroke();
};

function twoFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,4,2*Math.PI);
  ctx.fillText("$40", 75, 105);
  ctx.stroke();
};

function threeFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,2,2*Math.PI);
  ctx.fillText("$60", 75, 105);
  ctx.stroke();
};

function fourFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.arc(100,100,80,1,2*Math.PI);
  ctx.fillText("$80", 75, 105);
  ctx.stroke();
};

function fiveFifth() {
  resetCanv();
  ctx.beginPath();
  ctx.strokeStyle="coral";
  ctx.shadowBlur=20;
  ctx.shadowColor="white";
  ctx.arc(100,100,80,0,2*Math.PI);
  ctx.fillText("$100", 73, 105);
  ctx.stroke();
  levelUpConfetti();
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

function levelUpConfetti() {
  var congratulationsContainer = document.getElementById('confetti-container');

  congratulationsContainer.style.display = "block";
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
}, 3000);

setTimeout (function hideLevelUp() {
  congratulationsContainer.style.display = "none";
  numLevel = numLevel + 1;
  updateLevel();
  resetScore();
}, 5000);

};


/** Function

When a happens trigger oneFifth
When b happens trigger twoFifth
etc.

when f happens trigger end level + reward
resetScore();

**/

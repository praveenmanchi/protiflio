// const starfield = new OffscreenCanvas(600,300);
let starfield;
let starfieldContext;

let shootingStarField;
let shootingStarContext;
const possibleXDirections = [4, -3, 2, -1];
const possibleTimers = [13000,16000,10000];
let firstX,firstY,lastX,lastY;
let funcCallCount = 0;

function isMobile() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
    }
  else {
    return false;
  }
}

function drawStar(x,y,point=1){
  starfieldContext.beginPath();
  starfieldContext.arc(x,y,point,0,2*Math.PI);
  starfieldContext.fillStyle = '#bbbbbb';
  starfieldContext.fill();
  starfieldContext.strokeStyle = '#bbbbbb';
  starfieldContext.stroke();
}

const fadeStar = (fx,fy,lx,ly) => {
  let fadeOpacity = 0;
  // console.log("fading star");
  const fadeShooter = setInterval(() => {
    if(fadeOpacity > 1){
      shootingStarContext.clearRect(0,0,shootingStarField.width,shootingStarField.height);
      clearInterval(fadeShooter);
    }
    shootingStarContext.beginPath();
    fadeOpacity += .1;
    shootingStarContext.strokeStyle = `rgba(1,31,65,${fadeOpacity})`;
    shootingStarContext.lineWidth = 1;
    shootingStarContext.fill();
    shootingStarContext.moveTo(fx,fy);
    shootingStarContext.lineTo(lx,ly);
    shootingStarContext.stroke();
  },100);
}

function drawShootingStar(x,y,rgb=[255,255,255]){
  firstX = x;
  firstY = y;
  let opacity = 0.1;
  let counter = 1;
  shootingStarContext.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`
  let shootFading = false;
  funcCallCount++;
  const currentXDirection = possibleXDirections[funcCallCount % possibleXDirections.length];

  const starShooter = () => {
    if(counter < 110){
      requestAnimationFrame(starShooter);
    }else{
      setTimeout(() => fadeStar(firstX,firstY,x,y),1200);
    }

    shootingStarContext.beginPath();
    shootingStarContext.moveTo(x,y);
    shootingStarContext.lineWidth = opacity;
    counter++;

    if(opacity >= 1){
      shootFading = true;
    }

    if(shootFading){
      opacity -= 0.07
    }else{
      opacity += 0.01;
    }
    x += currentXDirection;
    y += 2.5;

    shootingStarContext.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`
    shootingStarContext.lineTo(x,y);
    shootingStarContext.stroke();
  }
  starShooter()
}


function paint(x,y){
  let starCount = 0;
  let endIntervalAt = isMobile()?80:270;
  const starAppearInterval = setInterval(function(){
    if(starCount >= endIntervalAt) clearInterval(starAppearInterval);
    drawStar(Math.random()*x,Math.random()*y/1.7,Math.random()/1.7);
    starCount++;
  },(isMobile())?30:9);
  let shootingStarInterval;
  setTimeout(()=> {
    initialCoords = isMobile() ? [x - 10, 50]: [x - 400, 50];
    drawShootingStar(...initialCoords);
    shootingStarInterval = setInterval(shootStar,10000);
  },3000);

  function shootStar(){
    drawShootingStar(Math.random()*x,Math.random()*y/2.3);
    clearInterval(shootingStarInterval);
    shootingStarInterval = setInterval(shootStar, possibleTimers[Math.floor(possibleTimers.length * Math.random())])
  }
}

function initStarfield(){
  // Here's initiating starfield.
  paint(starfield.width,starfield.height);
}    

if(self){
  self.onmessage = (res) => {
    starfield = res.data.starfield;
    shootingStarField = res.data.shootingStar;
    starfieldContext = starfield.getContext('2d');
    shootingStarContext = shootingStarField.getContext('2d');
    initStarfield();
  }
}

function declareContext(starfieldEl, shootingStarEl){
  starfield = starfieldEl;
  shootingStarField = shootingStarEl;
  starfieldContext = starfield.getContext('2d');
  shootingStarContext = shootingStarField.getContext('2d');
  initStarfield();
}
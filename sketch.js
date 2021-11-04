const buttonSize = 50;
let waves = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  newWave();
}

function draw(){
  background(0, 10);

  updateAndDrawWaves();

  drawButton();

}

function windowResized() {//resizing the canvas
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function mouseReleased(){
  if(dist(mouseX, mouseY, width/2, height/2) < buttonSize){
    nextPage();
  } else {
    newWave(mouseX-width/2, mouseY-height/2);
  }
}

function nextPage(){
  window.location.href = "./hero.html";
}

function drawButton(){
  push();
  if(dist(mouseX, mouseY, width/2, height/2) < buttonSize){
    fill('white');
  } else {
    fill('grey');
  }
  noStroke();
  ellipse(width/2, height/2, buttonSize * 2);
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Welcome", width/2, height/2);
  pop();
}

function updateAndDrawWaves(){
  for(let wave of waves){
    wave.update();
    wave.display();
  }
  if(frameCount % 600 == 0){
    newWave(0,0);
  }
}

function newWave(xOffset, yOffset){
  xOffset = xOffset ?? 0;
  yOffset = yOffset ?? 0;
  waves.push(new WaveCircle(xOffset, yOffset));
  if(waves.length > 3){
    waves.shift();
    print(waves.length);
  } else {
    print(waves.length);
  }
}

class WaveCircle{
  constructor(xOffset, yOffset){
    this.radius = buttonSize;
    this.noiseMult = 0;
    this.noiseSeed = random(100);
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    push();
    colorMode(HSB);
    this.col = color(random(360),100,100);
    pop(); 
  }
  update(){
    this.noiseMult+=0.004;
    this.radius++;
  }
  display(){
    push();
    noFill();
    stroke(this.col);
    strokeWeight(3);
    noiseSeed(this.noiseSeed);
    angleMode(DEGREES);
    for(let deg = 0; deg < 360; deg+=10){
      let x = (width/2) + this.xOffset + sin(deg) * noise(sin(deg)*this.noiseMult) * this.radius;
      let y = (height/2) + this.yOffset + cos(deg) * noise(cos(deg)*this.noiseMult) * this.radius;
      point(x,y,10);
    }
    pop();
  }
}
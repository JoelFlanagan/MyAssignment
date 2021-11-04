let moons = [];

function setup() {
  createCanvas(1200, 400);

  for (let i = 0; i < 20; i++) {
    moons.push(new Moon(random(width), random(height), random(5,50)));
  }
}

function draw() {
  background(120);
  strokeWeight(0);

  for (let i = 0; i < moons.length; i++) {
    moons[i].update();
    moons[i].display();
  }
}

class Moon {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-1,1);
    this.ySpeed = random(-1,1);
    this.phase = 0; //0-1
    this.radius = radius;
    this.rotation = 0;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.x > width+this.radius) this.x = 0-this.radius;
    if(this.x < 0-this.radius) this.x = width+this.radius;
    if(this.y > height+this.radius) this.y = 0-this.radius;
    if(this.y < 0-this.radius) this.y = height+this.radius;
    let toMouseVector = createVector(this.x - mouseX, this.y - mouseY);
    this.rotation = toMouseVector.heading();
    this.phase = map(toMouseVector.mag(), 0, this.radius, 1, 0, true);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    let diam = this.radius *2;
    if (this.phase < 0.5) {
      fill(255);
      ellipse(0, 0, diam, diam);
      fill(0);
      ellipse(0, 0, (1 - this.phase * 2) * diam, diam);
      arc(0, 0, diam, diam, PI + HALF_PI, HALF_PI);
    } else {
      fill(0);
      arc(0, 0, diam, diam, PI + HALF_PI, HALF_PI);
      fill(255);
      arc(0, 0, diam, diam, HALF_PI, PI + HALF_PI);
      ellipse(0, 0, (this.phase - 0.5) * 2 * diam, diam);
    }
    pop();
  }
}

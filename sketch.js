//coping with the ethanol fog

let EL;
let silEL;
let dad;
let base;
let wine;
let carDad;
let carEL;
let colour = 4;
//let inc = 3;


let bars = [];

function preload(){
  EL = loadImage('assets/ELDad_LemonCar_EL.png');
  silEL = loadImage('assets/ELDad_LemonCar_sil-EL.png');
  dad = loadImage('assets/ELDad_LemonCar_dad.png');
  wine = loadImage('assets/ELDad_LemonCar_wine.png');
  base = loadImage('assets/ELDad_LemonCar_base.png');
  carDad = loadImage('assets/ELDad_LemonCar_dadcar.png');
  carEL = loadImage('assets/ELDad_LemonCar_ELcar.png');
}

function setup() {
  createCanvas(base.width/2, base.height/2);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(8);
  for (let i=0; i < 30; i++){
    bars[i] = new Bar(0, random(height), random(30), random(-7, 7));
  }

}

function draw() {
  background(0);

  //base layer
  push();
  tint(255, random(50, 100));
  image(base, 0, 0, width, height);
  pop();

  //booze layer
  blend(wine, 0, 0, wine.width, wine.height, 0, 0, width, height, LIGHTEST);

  //cars
  blend(carDad, 0, 0, carDad.width, carDad.height, 0, 0, width, height, LIGHTEST);
  blend(carEL, 0, 0, carEL.width, carEL.height, 0, 0, width, height, LIGHTEST);

  //rolling bars
  for (let i = 0; i < bars.length; i++){
    bars[i].edges();
    bars[i].move();
    bars[i].show();
  }

  //dad
  push();
  tint(180, random(100), 100);
  dad.filter(GRAY);
  image(dad, 0, 0, width, height);
  pop();

  //EL
  push();
  EL.filter(GRAY);
  tint(4, 42, random(50));
  image(EL, 0, 0, width, height);
  pop();

  if (frameCount%int(random(20))==0){
    colour = random(360);
    EL.filter(INVERT);
  }
}

class Bar{
  constructor(x, y, r, inc){
    this.x = x;
    this.y = y;
    this.r = r;
    this.inc = inc;
  }

  edges(){
    // if (this.y > height){
    //   this.y = 0;
    // }
    if (this.y  < 0 || this.y > height){
      this.inc*=-1;
    }
  }
  move(){
    this.y += this.inc;
  }


  show(){
    noStroke();
    fill(0, random(50, 100));
    //fill(colour, random(100), random(100), random(100));
    rect(this.x, this.y, width, this.r);
  }
}

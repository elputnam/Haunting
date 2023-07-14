//coping with the ethanol fog

let EL;
let silEL;
let dad;
let base;
let wine;
let carDad;
let carEL;
let colour = 180;
//let inc = 3;
let sat = 100;
let lum = 0;
let grid = 255;


let bars1 = [];
let bars2 = [];

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
  for (let i=0; i < 10; i++){
    bars1[i] = new Bar1(0, random(height), random(100), random(-7, 7));
  }
  for (let i=0; i < 50; i++){
    bars2[i] = new Bar2(random(width), 0, random(10), random(-5, 5));
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
  for (let i = 0; i < bars2.length; i++){
    bars2[i].edges();
    bars2[i].move();
    bars2[i].show();
  }
  for (let i = 0; i < bars1.length; i++){
    bars1[i].edges();
    bars1[i].move();
    bars1[i].show();
  }

  

  //dad
  push();
  tint(colour, sat, 100);
  dad.filter(GRAY);
  image(dad, 0, 0, width, height);
  pop();

  //EL
  push();
  EL.filter(GRAY);
  tint(lum);
  image(EL, 0, 0, width, height);
  pop();

  //timed changes
  if (frameCount%int(random(10,20))==0){
    colour = random(360);
    EL.filter(INVERT);
    sat = random(50);
    lum = random(255);
    if (grid <= 0 ){
      grid = 255;
    } else {
      grid = 0;
    }
  
  }

  
}

class Bar1{
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
    fill(grid, 100);
    //fill(colour, random(100), random(100), random(100));
    rect(this.x, this.y, width, this.r);
  }
}

class Bar2{
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
    if (this.x  < 0 || this.x > width){
      this.inc*=-1;
    }
  }
  move(){
    this.x += this.inc;
  }


  show(){
    noStroke();
    fill(grid, 100);
    //fill(colour, random(100), random(100), random(50));
    rect(this.x, this.y, this.r, height);
  }
}
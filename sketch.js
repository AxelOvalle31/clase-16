
var trex ,trex_running ;
var suelo ,sueloimg ,sueloInvisible;
var cloudimage;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4,obstaculo5, obstaculo6;
var nubesGroup, cactusGroup;
var gameState = PLAY;
 var PLAY = 1;
 var END = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  sueloimg = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  terovolando = loadAnimation("tero1.png","tero2.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex=createSprite(50,160,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
  suelo=createSprite(200,190,600,20);
  suelo.addImage(sueloimg);
  sueloInvisible=createSprite(200,200,600,15);
  sueloInvisible.visible = false;
  cactusGroup = new Group();
  nubesGroup = new Group();
}

function draw(){
  background("white")
if(gameState===PLAY){
  suelo.velocityX = -5;
  if(suelo.x <0){
    suelo.x = suelo.width/2;
  }
  if(keyDown("space")&& trex.y >= 140){
    trex.velocityY= -5;
    }
    trex.velocityY = trex.velocityY +0.5;
   
    clouds();
    tero();
    cactus();
    if(cactusGroup.isTouching(trex)){
      gameState = END;
  
}
}
else if(gameState===END){
  suelo.velocityX = 0;
  cactusGroup.setVelocityXEach(0);
  nubesGroup.setVelocityXEach(0);
}
trex.collide(sueloInvisible);
  
 
  drawSprites();
}
function clouds(){
  if(frameCount %60 === 0){
 var cloud = createSprite(550,70);
 cloud.addImage(cloudimage);
 cloud.y = Math.round(random(1,100));
 cloud.velocityX = -3;

 cloud.lifetime = 180;
 nubesGroup.add(cloud);
 
 cloud.depth = trex.depth;
 trex.depth = trex.depth +1;

  }
}
function tero(){
if(frameCount %60 === 0){
var terodactilo = createSprite(500,70);
terodactilo.addAnimation("running", terovolando);
terodactilo.y = Math.round(random(1,100));
terodactilo.velocityX = -3;
}



}
function cactus(){
if(frameCount %100 === 0){
  var cactu = createSprite(600,160,20,20);
  cactu.velocityX = -3;
  cactu.lifetime = 180;
  var rand = Math.round(random(1, 6));
  switch (rand){
    case 1: cactu.addImage(obstaculo1);
    break;
    case 2: cactu.addImage(obstaculo2);
    break;
    case 3: cactu.addImage(obstaculo3);
    break;;
    case 4: cactu.addImage(obstaculo4);
    break;
    case 5: cactu.addImage(obstaculo5);
    break;
    case 6: cactu.addImage(obstaculo6);
    break;
    default:break;
}
  cactu.scale = 0.8;
  cactusGroup.add(cactu);
}
}
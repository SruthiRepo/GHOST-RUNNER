var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  spookySound.loop();
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 150);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5
}

function draw() {
  background(0);
  
  if (gameState=="play") {
    if(tower.y > 400){
      tower.y = 300
    }

  if (keyDown("left_arrow")) {
    ghost.x = ghost.x-3;
    
  }
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x+3;
    
  }
  if (keyDown("space")) {
    ghost.velocityY = -5;
    
  }
  ghost.velocityY = ghost.velocityY+0.8         
 
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    
  }
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
    
  }

  spawnDoors();
  drawSprites();
  }

  if (gameState==="end") {
    textSize(30);
    fill("yellow");
    text("Game Over", 300, 300);
    
  }

  

}

function spawnDoors(){
  if (frameCount%200 === 0) {
   door = createSprite(Math.round(random(50,500)), -50);
   door.addImage(doorImg);
   door.velocityY = 1
   door.lifetime = 650
   doorsGroup.add(door);
   
   climber = createSprite(door.x, 10);
   climber.addImage(climberImg);
   climber.velocityY = 1;
   climber.lifetime = 650;
   climbersGroup.add(climber);


  invisibleBlock = createSprite(door.x, 15);
  invisibleBlock.debug = true;
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 1;
 // invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);

   ghost.depth = door.depth;
   ghost.depth+=1;
  }

}

var npc1, npc11, npc22, npc33, npc2, npc3;
var pc1,pc;
var forest1, forest;
var invisibleGround;
var obstacleGroup, squirrelGroup,  obstacleGroup1;
var score = 0;

//ghost runs and jumps over obstacles

function preload(){
  pc1 = loadImage("ghost.gif");
  forest1 = loadImage("background.png");
  npc11 = loadImage("branch.png");
  npc22 = loadImage("rock.png");
  npc33 = loadImage("squirrel.png");
}
function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);

  forest = createSprite(950, 500,400,400)
  forest.addImage("forest1", forest1)
  forest.scale = 2
  forest.x = width/2


  pc = createSprite(75,800,20,50)
  pc.addImage("pc1", pc1);
  pc.scale = 0.2

  invisibleGround = createSprite(400,900,1600,10)
  invisibleGround.visible = false;

  obstacleGroup = new Group
  obstacleGroup1 = new Group
  squirrelGroup = new Group

  score = 0;
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(255,255,255);  
  forest.velocityX = -3

  if(forest.x < 875){
    forest.x = 950;
  }

  if(keyDown("space")&& pc.y>270){
    pc.velocityY = -16;
  }
  pc.velocityY = pc.velocityY + 0.8;
  
  spawnBranch();
  spawnRock();
  spawnSquirrel();

  pc.collide(invisibleGround);

  
  drawSprites();

  if(obstacleGroup1.isTouching(pc) || obstacleGroup.isTouching(pc)){
    gameOver()
  }
  
  if(squirrelGroup.isTouching(pc)){
    score = score + 1;
    squirrelGroup.destroyEach();
  }

  textSize(30);
  stroke(3);
  fill("black");
  text("score: "+ score, 800,  100)
}

function spawnBranch(){
  if(frameCount % 120 === 0){
    npc1 = createSprite(camera.position.x+700,850  ,40,40);
    npc1.setCollider("rectangle",0,0,200,200)
    npc1.addImage(npc11)
    npc1.velocityX = -(8)
    npc1.scale = 0.05

    npc1.lifetime = 400;
    obstacleGroup.add(npc1)
  }
}

function spawnRock(){
  if(frameCount % 180 === 0){
    npc2 = createSprite(camera.position.x+700,850,40,40);
    npc2.setCollider("rectangle",0,0,200,200)
    npc2.addImage(npc22)
    npc2.velocityX = -(8)
    npc2.scale = 0.1

    npc2.lifetime = 400;
    obstacleGroup1.add(npc2)
  }
}

function spawnSquirrel(){
  if(frameCount % 150 === 0){
    npc3 = createSprite(camera.position.x+700,800,40,40);
    npc3.setCollider("rectangle",0,0,200,200)
    npc3.addImage(npc33)
    npc3.velocityX = -(8)
    npc3.scale = 0.5

    npc3.lifetime = 400;
    squirrelGroup.add(npc3)
  }
}

function gameOver(){
  pc.velocityY  = 0;
  forest.velocityX = 0;
  obstacleGroup.setVelocityEach(0)
  obstacleGroup1.setVelocityEach(0)
  squirrelGroup.setVelocityEach(0)
  textSize(40)
  text("Game Over", 400, 200)
  score = 0  
  obstacleGroup.destroyEach();
  obstacleGroup1.destroyEach();
  squirrelGroup.destroyEach();
}
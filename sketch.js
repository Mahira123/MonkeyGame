
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600, 600);
  
  //creating monkey
  monkey = createSprite(80, 315,20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  var survivalTime = 0;
  
  

  
}


function draw() {
  background(255);
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //giving velocity
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  //giving gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //colliding the monkey with the ground
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
 
  
  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
  }
  
  //displaying score
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  
  

  
}

function spawnObstacles(){
  if(frameCount% 300 === 0){
    //creating obstacles
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;
    
    //adding image to obstacles
    obstacle.addImage(obstacleImage);
    
    //scaling the image
    obstacle.scale = 0.15;
    
    //giving lifetime to the object
    obstacle.lifetime = 300;
    
    //adding each obstacle to the group
    obstacleGroup.add(obstacle);
    
    
  }
}










function spawnBananas(){
  if(frameCount% 80 === 0){
    //creating banana
    banana = createSprite(600, 250, 40, 10);
    banana.velocityX = -5;
    banana.y = random(120, 200);
  
  //adding image of banana
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  
  //assigning lifetime
  banana.lifetime = 300;
  
  //giving depth to the monkey
  monkey.depth = banana.depth +1;
  
  //adding each banana to the group
  bananaGroup.add(banana);
    }
  
  
}







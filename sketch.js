var basketball, basketball_image;
var basketballPos1,basketballPos1_image;
var basketballPos1_image2;
var ball_collider,score_collider;
var hoop,hoop_image,hoop_collider,hoop_swish;
var basket;
var score,score_adder;

function preload(){
  //loading basketball...
  basketball_image = loadImage("basketball.png");
  
  //loading initial shooting position
  basketballPos1_image = loadImage("basketball1.png");
  
  //loading later shooting position
  basketballPos1_image2 =
  loadImage("download.png");
  
  hoop_image = loadImage("bBallHoop.png");
  hoop_swish = loadImage("bBallHoop1.png");
  
}
  
function setup(){
  createCanvas(400,400);
  //setting basketballPos images
  basketballPos1 = createSprite(350,300,20,170);
  basketballPos1.addImage("pos_1",basketballPos1_image);
  basketballPos1.addImage("pos_2",basketballPos1_image2);
 
  //setting basketball
  basketball = createSprite(60,190,20,20);
 // basketball.addImage("ball",basketball_image);
  basketball.y = basketballPos1.y - 85;
  basketball.x = 360;
  basketball.scale = 0.6;
  //basketball.setCollider("rectangle",0,0,30,1);
  basketball.debug=true
  //setting collider
  ball_collider = createSprite(350,205,100,1);
  ball_collider.y = basketball.y + 3; 
  ball_collider.visible = false;
  
  hoop = createSprite(60,180,20,20);
  hoop.addImage("hoop",hoop_image);
  hoop.addImage("hoop_swish",hoop_swish);
  hoop.scale = 0.5;
  hoop.setCollider("rectangle",-117,-40,20,160);
  hoop.velocityY  = -2;
  
  hoop_collider = createSprite(18,159,18,14);
  hoop_collider.visible = false;
  
  basket = createSprite(50,180,10,10);
  
  basket.visible = false;
  
 
  score = 0;
  score_adder = createSprite(50,180,40,1);
  score_adder.visible = true;
  score_collider  = createSprite(45,180,23.5,23.5);
  score_collider.visible =      true;
  
   score_collider.setCollider("circle",0,0,15);
}

function draw(){
  background(200);
  
    //Activate Movement
  if(keyDown("space") && basketball.collide(ball_collider)){
    basketballPos1.changeAnimation("pos_2",basketballPos1_image2);
    basketballPos1.scale = 1.15;
    basketball.velocityY = -10;
    basketball.velocityX = -9;
  } 
  else if(keyWentUp("space")){

    basketballPos1.changeAnimation("pos_1",basketballPos1_image);
    basketballPos1.scale = 1;
    
  }
  
  if(keyWentDown("a")){
       ballReset();
     }
  basket.y = hoop.y;
  hoop_collider.y = hoop.y - 21;

  score_adder.y = hoop.y;
  score_collider.y = basketball.y - 16;
  score_collider.x = basketball.x - 11;
 
  //gravity
  basketball.velocityY  += 0.5;
  
  edges= createEdgeSprites();
  basketball.collide( basketballPos1 );
  score_collider.bounceOff(hoop);
  score_collider.bounceOff(hoop_collider);
  
  basketball.bounceOff(hoop);
  basketball.bounceOff(hoop_collider);
  
  hoop.bounceOff(edges[2]);
    hoop.bounceOff(edges[3]);
  
  if(score_collider.isTouching(basket)){
     hoop.changeAnimation("hoop_swish",hoop_swish); 
  } else {
    hoop.changeAnimation("hoop",hoop_image);
    hoop.x = 60;
  }

    if(basketball.isTouching(score_adder)){
      score++;
    }
   
  drawSprites();
  
  fill(0);
  text("Baskets: " + score,300,50);
 
}

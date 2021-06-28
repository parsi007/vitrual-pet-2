var dog,dogimg,dogHappyImg;
var feedFoodButton,addFoodButton,fedTime,lastFed,foodObj;
var currentHour;
var stock;
var bedroomimg,gardenimg,livingRoomimg,washroomimg;
var gameState;
function preload(){
    dogimg=loadImage('images/dogImg.png');
    dogHappyImg=loadImage('images/dogImg1.png');

    bedroomimg=loadImage('virtual pet images/Bed Room.png')
    gardenimg=loadImage('virtual pet images/Garden.png')
    washroomimg=loadImage('virtual pet images/Wash Room.png')
}
function setup(){
    createCanvas(1250,500)
    database=firebase.database()
    foodObj=new Food();
    feedFoodButton=createButton("Feed")
    feedFoodButton.position(700,95)
    feedFoodButton.mousePressed(feedDog)

    addFoodButton=createButton("add Food")
    addFoodButton.position(800,95)
    addFoodButton.mousePressed(addFoods)
    
  
        dog=createSprite(350,150,20,20);
        dog.scale=0.5;
        dog.addImage(dogimg);
    
    
    //read game state from database
    readState=database.ref('gameState');
    readState.on("value",function(data){
        gameState=data.val();
    })
    
}

function draw(){
    background("green")

    if(currentHour===lastFed+1){
        update("playing")
        garden()
    }
    else if(currentHour===lastFed+2){
        update("sleeping")
        bedroom()
        console.log("hurray")
    }
    else if(currentHour>(lastFed+2)&&currentHour<=(lastFed+4)){
        update("bathing")
        washroom()
    }
    else{
        update("hungry")
        foodObj.display()
    }

    if(gameState!=="hungry"){
        feedFoodButton.hide()
        addFoodButton.hide()
        dog.remove();
    }
    else{
        feedFoodButton.show()
        addFoodButton.show()
        
    }
    

    textSize(30)
    fill("red")
    text(stock,100,80)
   
    stock=foodObj.foodStock
    foodObj.display();
    fedTime=database.ref("LastFed")
    fedTime.on("value",function(data){
     lastFed=data.val()
    })
    console.log(lastFed)
    console.log(currentHour)
    console.log(gameState)

    

    drawSprites();
    
}

addFoods=()=>{
 dog.addImage(dogimg)   
 foodObj.foodStock=foodObj.foodStock+1;
 database.ref('/').update({
     foodLeft:foodObj.foodStock
 })
}

feedDog=()=>{
    currentHour=hour()
    
    /*database.ref('/').update({
        LastFed:currentHour
    })*/
    dog.addImage(dogHappyImg)
    foodObj.foodStock=foodObj.foodStock-1;
    database.ref('/').update({
        foodLeft:foodObj.foodStock
    })
}

function update(state){
    database.ref('/').update({
        gameState:state
    })
}

function bedroom(){
   drawSprites()
    imageMode(CENTER)
    image(bedroomimg,625,250,750,500)
}
function garden(){
    background(gardenimg)
}
function washroom(){
    background(washroomimg)
}
class Food {
    constructor(){
        this.foodStock=20
        this.lastFed=null
        this.bottleImage=loadImage('virtual pet images/milk.png')
        this.input=createInput('Name your Pet')
        this.petName=createElement('h3')
        this.button=createButton('Enter')
        this.name=null
       
        
    }
    
    getFoodStock=()=>{
        var FoodStock=database.ref('foodLeft')
        FoodStock.on("value",function(data){
            this.foodStock=data.val()
        })
    }
    updateFoodStock=(x)=>{
        var updateStock=database.ref('/')
        updateStock.update({
            foodLeft:x
        })
    }
    deduct=()=>{
        database.ref('/').update({
            foodLeft:this.foodStock-1
        })
    }
   

    

    
    
    display(){
        this.input.position(800,400)
        this.button.position(950,400);
        this.button.mousePressed(()=>{
            this.name=this.input.value()
            this.petName.html("HI i am "+this.name)
            this.petName.position(40,80)
        })
        
        var x=780,y=300
        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+70
                }
                imageMode(CENTER)
                image(this.bottleImage,x,y,50,50)
                x=x+60
            }
        }
    }
    
}


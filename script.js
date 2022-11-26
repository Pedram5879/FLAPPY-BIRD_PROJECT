let cvs = document.querySelector("#myCanvas");
let ctx = cvs.getContext("2d");

var frames = 0;

var sprite = new Image();
sprite.src = "./images/sprite.png";

var state = {
    current : 0, 
    getReady : 0, 
    game : 1,
    gameOver : 2,
}

var bg = {
    sX : 0, 
    sY : 0, 
    w : 224, 
    h : 400, 
    x : 0, 
    y : cvs.height - 400, 
    darw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w
            , this.h)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.w, this.y, this.w
            , this.h)
    }
}

var fg = {
    sX :  465,
    sY : 0, 
    w : 195, //650 
    h : 85, 
    x : 0, 
    dx: 2, 
    y : cvs.height - 85, 
    darw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },
    update : function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx) % (this.w/10);
        }
    }
}

var bird = {
    animation : [
        {sX : 47 , sY : 7},
        {sX : 4, sY : 7},
        {sX : 47, sY : 7},
        {sX : 92, sY : 7},
    ],
    jump : -4.6, 
    w : 29, 
    h : 21, 
    x : 50, 
    y : 150, 
    animationIndex : 1,
    speed : 0,
    gravity : 0.25,
    rotation : 0,
    radius : 12,
    draw : function(){
        let bird2 = this.animation[this.animationIndex];
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite2, bird2.sX, bird2.sY, this.w , this.h, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    },
    flap : function(){
        this.speed = this.jump;
    },
    update : function(){
        var period = state.current == state.getReady ? 8 :4;
        this.animationIndex += frames % period == 0 ? 1 : 0;
        this.animationIndex = this.animationIndex % 4;
        if(state.current == state.getReady){
            this.y = 150;
        }
        else{
            if(this.speed < 0){
                this.rotation =  -25 * DEGREE;
                // console.log("soghot");
            }else{
                this.rotation = 70 * DEGREE;
                
            }
            this.speed += this.gravity;
            this.y += this.speed;
            // console.log(this.speed);
            // console.log(this.jump);
        }
        if(this.y + this.h/2 >= cvs.height - fg.h){
            this.y = cvs.height - fg.h - this.h/2;
            this.animationIndex = 1;
            // this.y = 150; 
            if(state.current == state.game){
                DIE.play();
                state.current = state.gameOver;
            }
        }
    }
};

var getReady = {
    sX :  455,
    sY : 140,
    w : 91, //546 218
    h : 78, 
    x : cvs.width/2 - 91/2,
    y : 80;
    draw : function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, 470, 97, 123, 38, 100, 40, 123, 38);
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            // ctx.drawImage(sprite, 550, 180, 83, 52, 120, 160, 83, 52);
        }
        // console.log(state.current);
    }
}

var gameOver = {
    sX :  6,
    sY : 402, 
    w : 174, //180 493                                          
    h : 91, 
    x : cvs.width/2 - 174/2, 
    y : 100, 
    draw : function(){
        if(state.current == state.gameOver){
            ctx.drawImage(sprite, 625, 96, 123, 38, 100, 40, 123, 38);
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            // ctx.drawImage()
            if(score.value >= 5){
                ctx.drawImage(sprite3, 0, 35, 40, 37, 82, 132, 40, 37);

            }
            else{
                ctx.drawImage(sprite3, 0, 0,40, 35, 82, 134, 40, 35);

            }
        }
        // console.log(state.current);
    },
}

function update(){
    bird.update();
    fg.update();
}
function darw(){
    ctx.fillStyle = "#4ec0ca";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.darw();
    fg.darw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function animate(){
    update()
    darw()
    frames ++;
    // console.log(frames);
    requestAnimationFrame(animate);
}

animate();

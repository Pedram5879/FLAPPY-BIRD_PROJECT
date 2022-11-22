let cvs = document.querySelector("#myCanvas");
let ctx = cvs.getContext("2d");

var frames = 0;

var sprite = new Image();
sprite.src = "./images/sprite.png";

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
};

function update(){
    fg.update();
}
function darw(){
    ctx.fillStyle = "#4ec0ca";
    ctx.fillRect(0, 0, cvs.width, cvs.height);


}

function animate(){
    update()
    darw()
    frames ++;
    // console.log(frames);
    requestAnimationFrame(animate);
}

animate();

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

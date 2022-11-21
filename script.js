let cvs = document.querySelector("#myCanvas");
let ctx = cvs.getContext("2d");

var frames = 0;

var sprite = new Image();
sprite.src = "./images/sprite.png";

   

function update(){

}
function darw(){


}

function animate(){
    update()
    darw()
    frames ++;
    // console.log(frames);
    requestAnimationFrame(animate);
}

animate();
let myCanvas = document.getElementById("gameScreen");

let ctx = myCanvas.getContext("2d");

const SCREEN_WIDTH = myCanvas.width = 800;
const SCREEN_HEIGHT = myCanvas.height = 600;

//player1 varaible
let wdp1 = 50;
let hgp1 = 50;
let xp1 = 0;
let yp1 = (SCREEN_HEIGHT - hgp1) / 2;
let colorp1 = 'black';
let p1_dy = 10;
let p1_dx = 10;
let p1_a_pressed;
let p1_w_pressed;
let p1_s_pressed;
let p1_d_pressed;
let p1_space_pressed;
//laser for p1
let p1_laserWidth = 80;
let p1_laserHeight = 20;
let p1_laserX = 0;
let p1_laserY = (SCREEN_HEIGHT - p1_laserHeight) / 2;
let p1_laserColor = 'black';
let p1_laserArray = [];
let p1_laserDx = 10;
let p1_laserDy = 10;


//player2 varaible
let wdp2 = 50;
let hgp2 = 50;
let xp2 = SCREEN_WIDTH - wdp2;
let yp2 = (SCREEN_HEIGHT - hgp1) / 2;
let colorp2 = 'red';
let p2_dy = 10;
let p2_dx = 10;
let p2_up_pressed;
let p2_down_pressed;
let p2_left_pressed;
let p2_right_pressed;
let p2_enter_pressed;
//laser for p2
let p2_laserWidth = 80;
let p2_laserHeight = 20;
let p2_laserX = SCREEN_WIDTH - p2_laserWidth;
let p2_laserY = (SCREEN_HEIGHT - p2_laserHeight) / 2;
let p2_laserColor = 'red';
let p2_laserArray = [];
let p2_laserDx = 10;
let p2_laserDy = 10;


class Player {
    constructor(x, y, width, height, color, dy, dx,
                lx, ly, lw, lh, ldx, ldy, lcolor){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        //laser this
        this.lx = lx;
        this.ly = ly;
        this.lw = lw;
        this.lh = lh;
        this.ldx = ldx;
        this.ldy = ldy;
        this.lcolor = lcolor;
    }

    //draw player - arrow function
    draw = () => {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    //draw laser - arrow function
    gun = () => {
        ctx.beginPath();
        ctx.rect(this.lx, this.ly, this.lw, this.lh);
        ctx.fillStyle = this.lcolor;
        ctx.fill();
        ctx.closePath();
    };


    update = () => {
        this.gun();
        this.draw();
    };

}
// //=============================LASER=============================================
// class Laser {
//     constructor(lx, ly, lw, lh, ldx, ldy, lcolor){
//         this.lx = lx;
//         this.ly = ly;
//         this.lw = lw;
//         this.lh = lh;
//         this.ldx = ldx;
//         this.ldy = ldy;
//         this.lcolor = lcolor;
//     }

//     laser = () => {
//         ctx.beginPath();
//         ctx.rect(this.lx, this.ly, this.lw, this.lh);
//         ctx.fillStyle = this.lcolor;
//         ctx.fill();
//         ctx.closePath();
//     };


//     up1 = () => {
//         if(p1_space_pressed){
//             this.lx += this.ldx;
//         }
//         let topEdge1 = this.ly + this.lh;
//         let rightEdge1 = this.lx + this.lw; 
//         let leftEdge1 = this.lx;
//         let bottomEdge1 = this.ly;
//         let topEdge2 = yp2 + hgp2;
//         let rightEdge2 = xp2 + wdp2; 
//         let leftEdge2 = xp2;
//         let bottomEdge2 = yp2;   
        
//         if( leftEdge1 < rightEdge2 && rightEdge1 > leftEdge2 && bottomEdge1 < topEdge2 && topEdge1 > bottomEdge2){
//             console.log('haha');
//         }


//         this.laser();
//     };

//     up2 = () => {
//         if(p2_enter_pressed){
//             this.lx -= this.ldx;
//         }
//         this.laser();
//     };

// }

let river_width = 100;
let river_height = 100;
let river_x = (SCREEN_WIDTH -river_width) / 2;
let river_y = 0;
class River {
    constructor(x, y, width, height){
        this.riverImg = document.getElementById("river_img");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw = () =>{
        for(let i = 0; i < 600; i++){
            ctx.beginPath();
            ctx.drawImage(this.riverImg, this.x, this.y + this.height * i, 
                this.width, this.height);
            ctx.closePath();
        }
    }

    update = () => {
        this.draw();
    }
}

let river = new River(river_x, river_y, river_width, river_height);

let player1 = new Player(xp1, yp1, wdp1, hgp1, colorp1, p1_dy, p1_dx,
                        p1_laserX, p1_laserY, p1_laserWidth, 
                        p1_laserHeight, p1_laserDx, p1_laserDy, p1_laserColor);
// let laser1 = new Laser(p1_laserX, p1_laserY, p1_laserWidth, 
//                         p1_laserHeight, p1_laserDx, p1_laserDy, p1_laserColor);
                        
let player2 = new Player(xp2, yp2, wdp2, hgp2, colorp2, p2_dy, p2_dx,
                        p2_laserX, p2_laserY, p2_laserWidth, 
                        p2_laserHeight, p2_laserDx, p2_laserDy, p2_laserColor);
// let laser2 = new Laser(p2_laserX, p2_laserY, p2_laserWidth, 
//                         p2_laserHeight, p2_laserDx, p2_laserDy, p2_laserColor);



//=============================LASER=============================================
let isRunning = true;
class Laser {
    constructor(lx, ly, lw, lh, ldx, ldy, lcolor){
        this.lx = lx;
        this.ly = ly;
        this.lw = lw;
        this.lh = lh;
        this.ldx = ldx;
        this.ldy = ldy;
        this.lcolor = lcolor;
    }

    laser = () => {
        ctx.beginPath();
        ctx.rect(this.lx, this.ly, this.lw, this.lh);
        ctx.fillStyle = this.lcolor;
        ctx.fill();
        ctx.closePath();
    };


    up1 = () => {
        if(p1_space_pressed){
            this.lx += this.ldx;
        }
        let topEdge1 = this.ly + this.lh;
        let rightEdge1 = this.lx + this.lw; 
        let leftEdge1 = this.lx;
        let bottomEdge1 = this.ly;
        let topEdge2 = player2.y + player2.height;
        let rightEdge2 = player2.x + player2.width; 
        let leftEdge2 = player2.x;
        let bottomEdge2 = player2.y;   
        
        if( leftEdge1 < rightEdge2 && rightEdge1 > leftEdge2 && bottomEdge1 < topEdge2 && topEdge1 > bottomEdge2){
            ctx.font = "50px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Player 1 win", 190, 190);
            isRunning = false;
        }


        this.laser();
    };

    up2 = () => {
        if(p2_enter_pressed){
            this.lx -= this.ldx;
        }
        let topEdge1 = this.ly + this.lh;
        let rightEdge1 = this.lx + this.lw; 
        let leftEdge1 = this.lx;
        let bottomEdge1 = this.ly;
        let topEdge2 = player1.y + player1.height;
        let rightEdge2 = player1.x + player1.width; 
        let leftEdge2 = player1.x;
        let bottomEdge2 = player1.y;   
        
        if( leftEdge1 < rightEdge2 && rightEdge1 > leftEdge2 && bottomEdge1 < topEdge2 && topEdge1 > bottomEdge2){
            //location.reload();
            ctx.font = "50px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Player 2 win", 610, 190);
            isRunning = false;
        }

        this.laser();
    };

}

 
//Handler
function keyDownHandler(event){
    switch(event.keyCode){
        //key for player1
        case 65://a
        p1_a_pressed = true;
        break;
        case 68://d
        p1_d_pressed = true;
        break;
        case 83://s
        p1_s_pressed = true;
        break;
        case 87://w
        p1_w_pressed = true;
        break;
        case 32://space
        p1_space_pressed = true;
        p1_laserArray.push(new Laser(p1_laserX, p1_laserY, p1_laserWidth, 
            p1_laserHeight, p1_laserDx, p1_laserDy, p1_laserColor));
        break;


        //key for player2
        case 37://left arrow
        p2_left_pressed = true;
        break;
        case 38://up arrow
        p2_up_pressed = true;
        break;
        case 39://right arrow
        p2_right_pressed = true;
        break;
        case 40://down arrow
        p2_down_pressed = true;
        break;
        case 13:
        p2_enter_pressed = true;
        p2_laserArray.push(new Laser(p2_laserX, p2_laserY, p2_laserWidth, 
            p2_laserHeight, p2_laserDx, p2_laserDy, p2_laserColor));

        break;
    }
}


function keyUpHandler(event){
    switch(event.keyCode){
        //key for player1
        case 65://a
        p1_a_pressed = false;
        break;
        case 68://d
        p1_d_pressed = false;
        break;
        case 83://s
        p1_s_pressed = false;
        break;
        case 87://w
        p1_w_pressed = false;
        break;

        //key for player2
        case 37://left arrow
        p2_left_pressed = false;
        break;
        case 38://up arrow
        p2_up_pressed = false;
        break;
        case 39://right arrow
        p2_right_pressed = false;
        break;
        case 40://down arrow
        p2_down_pressed = false;
        break;
    }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


let img = document.getElementById("river_img");

function gameLoop(){
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    player1.update();
    player2.update();
    river.update();


    //player1
    for(let i = 0; i < p1_laserArray.length; i++){
        p1_laserArray[i].up1();
    }

    if(p1_w_pressed && player1.y > 0){
        player1.y -= p1_dy;
        player1.ly -= p1_laserDy;
        p1_laserY -= p1_laserDy;
    }

    if(p1_s_pressed && player1.y + player1.height < SCREEN_HEIGHT){
        player1.y += p1_dy;
        player1.ly += p1_laserDy;
        p1_laserY += p1_laserDy;
    }
    
    if(p1_a_pressed && player1.x > 0){
        player1.x -= p1_dx;
        player1.lx -= p1_laserDx;
        p1_laserX -= p1_laserDx;
    }

    if(p1_d_pressed && player1.x + player1.width < river_x){
        player1.x += p1_dx;
        player1.lx += p1_laserDx;
        p1_laserX += p1_laserDx;
    }

    //player2
    for(let i = 0; i < p2_laserArray.length; i++){
        p2_laserArray[i].up2();
    }

    if(p2_up_pressed && player2.y > 0){
        player2.y -= p2_dy;
        player2.ly -= p2_laserDy;
        p2_laserY -= p2_laserDy;
    }

    if(p2_down_pressed && player2.y + player2.height < SCREEN_HEIGHT){
        player2.y += p2_dy;
        player2.ly += p2_laserDy;
        p2_laserY += p2_laserDy;
    }

    if(p2_left_pressed && player2.x > river_x + river_width){
        player2.x -= p2_dx;
        player2.lx -= p2_laserDx;
        p2_laserX -= p2_laserDx;
    }

    if(p2_right_pressed && player2.x + player2.width < SCREEN_WIDTH){
        player2.x += p2_dx;
        player2.lx += p2_laserDx;
        p2_laserX += p2_laserDx;
    }

    if(isRunning){
        requestAnimationFrame(gameLoop);
    }
    
}

requestAnimationFrame(gameLoop);

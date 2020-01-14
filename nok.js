// nok.js 
//patern 0 all white
//patern 1 all black
//patern 2 checker: (x+y)%2
//patern 3 dots: (x*y)%2
//patern 4 inverted dots (x*y+1)%2
//patern 5 doted lines (x*y)%2 && (x*y)%3==0
//patern 6 arrows (x*y)%2==1 || (x*y)%3==0

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const WIDTH = 84
const HEIGHT = 48
var SCALEH = 4 
var SCALEW = 4
const FPS = 15 //locking the framerate to a lcd like speed

canvas.width = WIDTH*SCALEW
canvas.height = HEIGHT*SCALEH
const ctx = canvas.getContext("2d");

window.addEventListener("keydown" ,(event)=>{
    switch (event.code) {
        case "Numpad7":
        case "Digit1":
            nok.key.one = true;
            break;
        case "Numpad8":
        case "Digit2":
            nok.key.two = true;
            break;
        case "Numpad9":
        case "Digit3":
            nok.key.three = true;
            break;
        case "Numpad4":
        case "KeyQ":
        case "Digit4":
            nok.key.four = true;
            break;
        case "Numpad5":
        case "KeyW":
        case "Digit5":
        case "ArrowUp":
            nok.key.five = true;
            break;
        case "Numpad6":
        case "KeyE":
        case "Digit6":
            nok.key.six = true;
            break;
        case "Numpad1":
        case "KeyA":
        case "Digit7":
        case "ArrowLeft":
            nok.key.seven = true;
            break;
        case "Numpad2":
        case "KeyS":
        case "Digit8":
        case "ArrowDown":
            nok.key.eight = true;
            break;
        case "Numpad3":
        case "KeyD":
        case "Digit9":
        case "ArrowRight":
            nok.key.nine = true;
            break;
        case "Numpad0":
        case "Keyz":
            nok.key.star = true;
            break;
        case "NumpadDecimal":
        case "KeyX":
        case "Digit0":
            nok.key.zero = true;
            break;
        case "NumpadEnter":
        case "KeyC":
            nok.key.octothorpe = true;
            break;
        
    }
});
window.addEventListener("keyup" ,(event)=>{
    switch (event.code) {
        case "Numpad7":
        case "Digit1":
            nok.key.one = false;
            break;
        case "Numpad8":
        case "Digit2":
            nok.key.two = false;
            break;
        case "Numpad9":
        case "Digit3":
            nok.key.three = false;
            break;
        case "Numpad4":
        case "KeyQ":
        case "Digit4":
            nok.key.four = false;
            break;
        case "Numpad5":
        case "KeyW":
        case "Digit5":
        case "ArrowUp":
            nok.key.five = false;
            break;
        case "Numpad6":
        case "KeyE":
        case "Digit6":
            nok.key.six = false;
            break;
        case "Numpad1":
        case "KeyA":
        case "Digit7":
        case "ArrowLeft":
            nok.key.seven = false;
            break;
        case "Numpad2":
        case "KeyS":
        case "Digit8":
        case "ArrowDown":
            nok.key.eight = false;
            break;
        case "Numpad3":
        case "KeyD":
        case "Digit9":
        case "ArrowRight":
            nok.key.nine = false;
            break;
        case "Numpad0":
        case "Keyz":
            nok.key.star = false;
            break;
        case "NumpadDecimal":
        case "KeyX":
        case "Digit0":
            nok.key.zero = false;
            break;
        case "NumpadEnter":
        case "KeyC":
            nok.key.octothorpe = false;
            break;
        
    }
});

nok ={
    key:{   one:false,two:false,three:false,
            four:false,five:false,six:false,
            seven:false,eight:false,nine:false,
            star:false,zero:false,octothorpe:false
    },
    _lasttime:0,_dt:0,
    clear:(patern)=>{
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                nok.screen[x][y]=patern
            }
        }
    },
    rect:(patern,rx,ry,w,h)=>{
        rx = Math.floor(rx); ry = Math.floor(ry); w = Math.floor(w); h = Math.floor(h); //remove floating point
        for (let x = rx; x < rx+w; x++) {
            for (let y = ry; y < ry+h ; y++) {
                if(x>=0 && x<WIDTH && y>=0 && y< HEIGHT)
                nok.screen[x][y]=patern
            }
        }
    },
    line:(x0,y0,x1,y1)=>{
        x0 = Math.floor(x0); y0 = Math.floor(y0); x1 = Math.floor(x1); y1 = Math.floor(y1);
        let dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1;
        let dy = Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2;
        while (true) {
            if(x0>=0 && x0<WIDTH && y0>=0 && y0< HEIGHT)
            nok.screen[x0][y0]=1
        if (x0 === x1 && y0 === y1) break;
        let e2 = err;
        if (e2 > -dx) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dy) {
            err += dx;
            y0 += sy;
        }
        }
    },
    sprite:(sprite,sx,sy)=>{
        sx = Math.floor(sx);sy = Math.floor(sy);
        for (let y = 0; y < sprite.length; y++) {
            for (let x = 0; x < sprite[y].length; x++) {
                if(x+sx>=0 && x+sx<WIDTH && y+sy>=0 && y+sy< HEIGHT && sprite[y][x]>=0)
                    nok.screen[x+sx][y+sy]=sprite[y][x]
            }
        }
    },
    pixel:(x,y)=>{
        x = Math.floor(x); y = Math.floor(y);
        if(x>=0 && x<WIDTH && y>=0 && y< HEIGHT)
        nok.screen[x][y]=1
    },
    circle:(radius, centerx, centery)=>{
        centerx =Math.floor(centerx); centery=Math.floor(centery); radius=Math.floor(radius);
        radius = Math.abs(radius)
        let cp = (cx,cy, x,y)=>{
        if(x === 0){
            nok.pixel(cx,cy+y);
            nok.pixel(cx, cy-y);
            nok.pixel(cx+y,cy);
            nok.pixel(cx-y,cy);
        }else if(x === y){
            nok.pixel(cx + x, cy + y);
            nok.pixel(cx - x, cy + y);
            nok.pixel(cx + x, cy - y);
            nok.pixel(cx - x, cy - y);
        }else if(x<y){
            nok.pixel(cx + x, cy + y);
            nok.pixel(cx - x, cy + y);
            nok.pixel(cx + x, cy - y);
            nok.pixel(cx - x, cy - y);
    
            nok.pixel(cx + y, cy + x);
            nok.pixel(cx - y, cy + x);
            nok.pixel(cx + y, cy - x);
            nok.pixel(cx - y, cy - x);
        }
        };
    
        let x = 0;
        let y = radius;
        let p = (5-radius*4)/4;
        cp(centerx,centery,x,y);
        while (x < y) {
            x++;
            if (p < 0) {
                p+=2*x+1;
            }else{
                y--;
                p +=2*(x-y)+1;
            }
            cp(centerx,centery,x,y);
        }
    },
    number:(number,x,y)=>{ //simplistic way to print snake font numbers
        x = Math.floor(x); y = Math.floor(y);
        number = ""+number;
        offset =0
        for (let i = 0; i < number.length; i++) {
            let t = number.charCodeAt(i)
            if(t == 45) t=59
            else if(t<48 || t>57) t=58 
            nok.sprite(nok.num[t-48],x+offset,y)
            offset += nok.num[t-48][0].length + 1
        }
    },
    resize:()=>{
        if(window.innerHeight/HEIGHT < window.innerWidth/WIDTH){
            SCALEW = (window.innerHeight/HEIGHT)
            SCALEH = (window.innerHeight/HEIGHT)
        }else{
            SCALEW = (window.innerWidth/WIDTH)
            SCALEH = (window.innerWidth/WIDTH)
        }
        canvas.width = WIDTH*SCALEW
        canvas.height = HEIGHT*SCALEH
    }
}
window.addEventListener('load', ()=>{
    window.addEventListener("resize", nok.resize);
    nok.resize()
    //initilize screen
    nok.screen = []
    for (let x = 0; x < WIDTH; x++) {
        nok.screen[x]=[]
        for (let y = 0; y < HEIGHT; y++) {
            nok.screen[x][y]=0
        }
    }
    if(typeof(init) != 'undefined') init();
    _nokDrawScreen(0);
})

function _nokDrawScreen(time) {
    setTimeout(function() {
        requestAnimationFrame(_nokDrawScreen);
        nok._dt = (time - nok._lasttime)*0.012;
        nok._lasttime = time;
        if(typeof(draw) != 'undefined') draw(nok._dt);
        const B = '#43523d'
        const W = '#c7f0d880'
        let dot = W
        ctx.fillStyle = '#d0f4df80' 
        ctx.fillRect(0, 0, WIDTH*SCALEW , HEIGHT*SCALEH);
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                switch(nok.screen[x][y]) {
                    case 0:
                        dot = W;
                        break;
                    case 1:
                        dot = B;
                        break;
                    case 2:
                        dot = (x+y)%2 ? B : W;
                        break;
                    case 3:
                        dot = (x*y)%2 ? B : W;
                        break;
                    case 4:
                        dot = (x*y+1)%2 ? B : W;
                        break;
                    case 5:
                        dot = (x*y)%2 && (x*y)%3==0 ? B : W;
                        break;
                    case 6:
                        dot = (x*y)%2==1 || (x*y)%3==0 ? B : W;
                        break;
                    default:
                        dot = W;
                }
                ctx.fillStyle = dot
                ctx.fillRect(x*SCALEW, y*SCALEH, SCALEW-0.25, SCALEH-0.25);
            }   
        }

    }, 1000 / FPS);
}

nok.num =[
    [   [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1],],
    [   [0,1,0],
        [1,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],],
    [   [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1],],
    [   [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],],
    [   [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1],],
    [   [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1],],
    [   [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1],],
    [   [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],],
    [   [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1],],
    [   [1,1,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],],
    [   [0],
        [0],
        [0],
        [1],
        [1],],
    [   [0,0,0],
        [0],
        [1,1,1]],
]

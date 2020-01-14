let spr;
let timer =0
let player = {x:20,y:20}

function init(){
    //sprites are a 2d array -1 is transparent 0-6 are the paterns
    spr = [
        [-1,1,-1,1,-1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,0,0,-1,1],
        [-1,1,0,1,-1],
        [-1,-1,1,-1,-1]
    ]
}
function draw(dt){
    timer +=0.1*dt
    nok.clear(0) //clear(patern 0-6)
    nok.line(10,10,50,25) //line(start x,start y,end x,end y)
    nok.sprite(spr,20,20) //sprite(data,x,y)
    nok.rect(Math.floor(timer%6)+1,20+Math.sin(timer)*20,20+Math.cos(timer)*20,10,10) // rect(patern 0-6, x, y, width, height)
    nok.circle(Math.floor(Math.sin(timer)*10),50,20) //circle(radius,x, y)
    nok.number(timer.toFixed(2),0,0) //number(value, x, y)
    
    if(nok.key.five)
        player.y --
    if(nok.key.eight)
        player.y ++
    if(nok.key.seven)
        player.x --
    if(nok.key.nine)
        player.x ++
    nok.sprite(spr,player.x,player.y)
}

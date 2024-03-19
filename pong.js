leftPlayer = [250,350];
rightPlayer = [250,350];

lpIndice = 0;
rpIndice = 0;

const setIndice = () => {
    if (lpIndice > 0) { lpIndice -= 1}
    if (lpIndice < 0) { lpIndice += 1}
    if (rpIndice > 0) { rpIndice -= 1}
    if (rpIndice < 0) { rpIndice += 1}
}

key_pressed = { "o" : false, "q" : false, "a" : false, "l" : false };

const updow = (e) => {
    if (e.key === "q") { key_pressed["q"] = true }
    if (e.key === "a") { key_pressed["a"] = true }
    if (e.key === "o") { key_pressed["o"] = true }
    if (e.key === "l") { key_pressed["l"] = true }

    if (key_pressed["o"] === true) {
        if (rightPlayer[0] > 5 ){rightPlayer[0] -= 40; rightPlayer[1] -= 40; 
        if (rpIndice > 0) {rpIndice = 0}
        if (rpIndice <= 0) {rpIndice -= 2}
        }
        key_pressed["l"] = false;
    }
    if (key_pressed["l"] === true) {
        if (rightPlayer[1] < 595 ){ rightPlayer[0] += 40; rightPlayer[1] += 40;
            if (rpIndice >= 0) {rpIndice += 2}
            if (rpIndice < 0) {rpIndice = 0}
        }
        key_pressed["o"] = false;
    }
    if (key_pressed["q"] === true) {
        if (leftPlayer[0] > 5 ){ leftPlayer[0] -= 40; leftPlayer[1] -= 40;
            if (lpIndice <= 0) {lpIndice -= 2}
            if (lpIndice > 0) {lpIndice = 0}}
        key_pressed["a"] = false;
    }
    if (key_pressed["a"] === true) {
        if (leftPlayer[1] < 595 ){ leftPlayer[0] += 40; leftPlayer[1] += 40;
            if (lpIndice >= 0) {lpIndice += 2}
            if (lpIndice < 0) {lpIndice = 0}}
        key_pressed["q"] = false;
    }
}

const keyup = (e) => {
    key_pressed[e.key] = false;
   
    
    if (key_pressed["o"] === true) {
        if (rightPlayer[0] > 5 ){rightPlayer[0] -= 40; rightPlayer[1] -= 40; 
        if (rpIndice > 0) {rpIndice = 0}
        if (rpIndice <= 0) {rpIndice -= 1}
        }
        key_pressed["l"] = false;
    }
    if (key_pressed["l"] === true) {
        if (rightPlayer[1] < 595 ){ rightPlayer[0] += 40; rightPlayer[1] += 40;
            if (rpIndice >= 0) {rpIndice += 1}
            if (rpIndice < 0) {rpIndice = 0}
        }
        key_pressed["o"] = false;
    }
    if (key_pressed["q"] === true) {
        if (leftPlayer[0] > 5 ){ leftPlayer[0] -= 40; leftPlayer[1] -= 40;
            if (lpIndice <= 0) {lpIndice -= 1}
            if (lpIndice > 0) {lpIndice = 0}}
        key_pressed["a"] = false;
    }
    if (key_pressed["a"] === true) {
        if (leftPlayer[1] < 595 ){ leftPlayer[0] += 40; leftPlayer[1] += 40;
            if (lpIndice >= 0) {lpIndice += 1}
            if (lpIndice < 0) {lpIndice = 0}}
        key_pressed["q"] = false;
    }
}

window.addEventListener("keydown", (e) => {updow(e);})
window.addEventListener("keyup", (e) => {keyup(e);})

setInterval(setIndice, 200);

let playerA = 0;
let playerB = 0;
document.getElementById("score").innerHTML = `SCORE: ${playerA} / ${playerB}`;
//// CANVAS ////

const ctx = document.querySelector("canvas").getContext("2d");

const init = () => {
    window.requestAnimationFrame(draw);
}

let x = 600;
let y = 300;
let dirX = (Math.floor(Math.random()*2)) === 0 ? -4 : +4 ;
let dirY = (Math.floor(Math.random()*2)) === 0 ? -4 : +4 ;

const draw = () => {
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 1200, 600);
    ctx.fillStyle = "rgb(0 0 0 / 10%)";
    ctx.fillRect(0, 0, 1200, 600);
    ctx.beginPath(); 
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 600); 
    ctx.stroke(); 

    //left Player
    ctx.beginPath(); 
    ctx.lineWidth = 5;
    ctx.moveTo(30, leftPlayer[0]);
    ctx.lineTo(30, leftPlayer[1]); 
    ctx.stroke(); 

    //right Player
    ctx.beginPath();
    ctx.moveTo(1170, rightPlayer[0]); 
    ctx.lineTo(1170, rightPlayer[1]); 
    ctx.stroke(); 

    //ball
    ctx.beginPath();
    if (y < leftPlayer[1]+10 && y > leftPlayer[0]-10 && x <= 40 && x >=25) {
        dirX = +6; 
        if(lpIndice <= 0){ dirX += Math.floor(Math.abs(lpIndice))}
            if(lpIndice > 0){  dirX += Math.floor(Math.abs(lpIndice))}
    }
    if (y < rightPlayer[1]+10 && y > rightPlayer[0]-10 && x <= 1175 && x >= 1160) {
        dirX = -6;
        if(rpIndice <= 0){ dirX -= Math.floor(Math.abs(rpIndice)) }
            if(rpIndice > 0){ dirX -= Math.floor(Math.abs(rpIndice))}
    }

    if (x > 1200) { x = 600; dirX = (Math.floor(Math.random()*2)) === 0 ? -4 : +4; playerA += 1; document.getElementById("score").innerHTML = `SCORE: ${playerA} / ${playerB}`}
    if (x < 0) { x = 600; dirX = (Math.floor(Math.random()*2)) === 0 ? -4 : +4; playerB += 1; document.getElementById("score").innerHTML = `SCORE: ${playerA} / ${playerB}`;}
    x += dirX; 

    if (y > 590) { dirY = -Math.abs(dirY) }
    if (y < 10) { dirY = +Math.abs(dirY)}
    y += dirY;

    ctx.lineWidth = 1;
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();

    window.requestAnimationFrame(draw);
  }

init();

// CANVAS //
// select canvas element
const canvas = document.getElementById("game");
canvas.width = 700;
canvas.height = (3 ** 0.5) / 2 * canvas.width;

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const gameSocket = new WebSocket(
    'wss://' + window.location.host + `/ws/game/?mode=2p&userId=${userId}`
);

gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    render(data);
    updateScore(data.players);
};

function updateScore(players) {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const player3 = document.getElementById("player3");
    if (player1 && player2 && player3) {
      player1.innerText = players[0].score;
      player2.innerText = players[1].score;
      player2.innerText = players[2].score;
    }
}

gameSocket.onclose = function(e) {
    console.error('Game socket closed');
};

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "BLACK";
    ctx.font = "60px 바탕";
    ctx.fillText(text, x, y);
}

function drawTriangle(x1, y1, x2, y2, x3, y3, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // 첫 번째 꼭짓점
    ctx.lineTo(x2, y2); // 두 번째 꼭짓점
    ctx.lineTo(x3, y3); // 세 번째 꼭짓점
    ctx.closePath(); // 경로 닫기 (첫 번째 꼭짓점과 세 번째 꼭짓점 연결)

    ctx.fillStyle = color;
    ctx.fill();
}

function rotate(x, y, width, height, angle) {
    // 회전의 중심을 사각형의 중심으로 이동
    ctx.translate(x + width / 2, y + height / 2);
    // 지정된 각도로 회전
    ctx.rotate(angle * Math.PI / 180);
    // 회전의 중심을 원래 위치로 되돌림
    ctx.translate(-(x + width / 2), -(y + height / 2));
}

let keyState = {
    leftArrow: false,
    rightArrow: false
};

// 키보드 누름 이벤트 핸들러
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) { // 왼쪽 화살표 키
        keyState.leftArrow = true;
    } else if (event.keyCode === 39) { // 오른쪽 화살표 키
        keyState.rightArrow = true;
    }
    gameSocket.send(JSON.stringify({ playerId: userId, ...keyState }));
});

// 키보드 떼기 이벤트 핸들러
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 37) { // 왼쪽 화살표 키
        keyState.leftArrow = false;
    } else if (event.keyCode === 39) { // 오른쪽 화살표 키
        keyState.rightArrow = false;
    }
    gameSocket.send(JSON.stringify({ playerId: userId, ...keyState }));
});


const backGround = new Image();
backGround.src = "/static/assets/images/map-pingpong.svg";

const ballImage = new Image();
ballImage.src = "/static/assets/images/ball-pingpong.svg";

// render function, the function that does al the drawing
function render(data){
      // draw backGround
    if (backGround.complete) {
        ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
    } else {
        backGround.onload = function () {
        ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
        };
    }
    
    drawTriangle(canvas.width / 2, 0, 0, canvas.height, canvas.width, canvas.height, "#000");
    
    ctx.save();
    for (var i = 0; i < data.players.length; i++) {
        if (userId == data.players[i].playerId) {
          player = data.players[i];
        }
    }
    rotate(0, 0, canvas.width, 2 *canvas.height - canvas.width / (3 ** 0.5), player.angle * -1);

    for (var i = 0; i < data.players.length; i++) {
        ctx.save();
        rotate(data.players[i].x, data.players[i].y, data.players[i].width, data.players[i].height, data.players[i].angle * -1);
        drawRect(data.players[i].x, data.players[i].y, data.players[i].width, data.players[i].height, data.players[i].color);
        ctx.restore();
    }
    
    // draw the ball
    if (ballImage.complete) {
        ctx.drawImage(
        ballImage,
        data.ball.x - data.ball.radius,
        data.ball.y - data.ball.radius,
        data.ball.radius * 2,
        data.ball.radius * 2
        );
    } else {
        ballImage.onload = function () {
        ctx.drawImage(
            ballImage,
            data.ball.x - data.ball.radius,
            data.ball.y - data.ball.radius,
            data.ball.radius * 2,
            data.ball.radius * 2
        );
        };
    }

    ctx.restore();
    
    
    if (data.winner) {
        if (data.winner == userId) {
        drawText("You Win!", 250, 250);
        }
        else {
        drawText("You Lose!", 250, 250);
        }
    }
}

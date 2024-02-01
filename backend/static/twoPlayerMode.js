// select canvas element
const canvas = document.getElementById("game");
canvas.width = 800;
canvas.height = 500;

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const gameSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/game/'
);

// gameSocket.onopen = function() {
//     // WebSocket 연결이 열리면 플레이어 ID 전송
//     const playerId = 'player1'; // 예시 ID
//     gameSocket.send(JSON.stringify({ type: 'register', playerId: playerId }));
// };


gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    render(data);
};

gameSocket.onclose = function(e) {
    console.error('Game socket closed unexpectedly');
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
    gameSocket.send(JSON.stringify({ playerId: 'player2', ...keyState }));
});

// 키보드 떼기 이벤트 핸들러
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 37) { // 왼쪽 화살표 키
        keyState.leftArrow = false;
    } else if (event.keyCode === 39) { // 오른쪽 화살표 키
        keyState.rightArrow = false;
    }
    gameSocket.send(JSON.stringify({ playerId: 'player2', ...keyState }));
});

// render function, the function that does al the drawing
function render(data){
    // clear the canvas
    drawRect(0, 0, canvas.width/ 4 * 3, canvas.height, "#000");

    // rotate(0, 0, canvas.width/4 * 3, canvas.height, 180);
    
    for (var i = 0; i < data.players.length; i++) {
        drawRect(data.players[i].x, data.players[i].y, data.players[i].width, data.players[i].height, data.players[i].color);
    }
    
    // draw the ball
    drawArc(data.ball.x, data.ball.y, data.ball.radius, data.ball.color);
    
    // rotate(0, 0, canvas.width/4 * 3, canvas.height, -180);

    // clear the score
    drawRect(canvas.width/5 * 4, 0, canvas.width/5, canvas.height, "#FFF")
    // draw players[0] score to the left
    drawText(data.players[0].score, canvas.width/5 * 4, canvas.height/5);
    
    // draw the COM score to the right
    drawText(data.players[1].score, canvas.width/5 * 4, canvas.height/5 * 2);
}

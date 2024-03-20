import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { ScoreBoard } from "../components/Board/index.js";
import { mapImages, themeImages } from "../config/index.js";
import Store from "../store/index.js";

class TwoPlayerMode extends Component {
  constructor(props) {
    super(props);
    this.keyState = {
      leftArrow: false,
      rightArrow: false,
    };
    this.backGround = new Image();
    this.backGround.src = mapImages[Store.state.theme];

    this.ballImage = new Image();
    this.ballImage.src = themeImages[Store.state.theme];
  }

  renderGame(data) {
    // draw backGround
    if (this.backGround.complete) {
      this.ctx.drawImage(this.backGround, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.backGround.onload = function () {
        this.ctx.drawImage(this.backGround, 0, 0, this.canvas.width, this.canvas.height);
      };
    }

    let player;

    this.ctx.save();
    for (var i = 0; i < data.players.length; i++) {
      if (userId == data.players[i].playerId) {
        player = data.players[i];
      }
    }

    this.rotate(0, 0, this.canvas.width, this.canvas.height, player.angle * -1);

    for (var i = 0; i < data.players.length; i++) {
      this.drawRect(
        data.players[i].x,
        data.players[i].y,
        data.players[i].width,
        data.players[i].height,
        data.players[i].color
      );
    }

    // draw the ball
    if (this.ballImage.complete) {
      this.ctx.drawImage(
        this.ballImage,
        data.ball.x - data.ball.radius,
        data.ball.y - data.ball.radius,
        data.ball.radius * 2,
        data.ball.radius * 2
      );
    } else {
      this.ballImage.onload = function () {
        this.ctx.drawImage(
          this.ballImage,
          data.ball.x - data.ball.radius,
          data.ball.y - data.ball.radius,
          data.ball.radius * 2,
          data.ball.radius * 2
        );
      };
    }

    this.ctx.restore();

    if (data.winner) {
      if (data.winner == userId) {
        this.drawText("You Win!", 250, 250);
      } else {
        this.drawText("You Lose!", 250, 250);
      }
    }
  }

  keyboardEvent() {
    // 키보드 누름 이벤트 핸들러
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 37) {
        // 왼쪽 화살표 키
        this.keyState.leftArrow = true;
      } else if (event.keyCode === 39) {
        // 오른쪽 화살표 키
        this.keyState.rightArrow = true;
      }
      this.gameSocket.send(
        JSON.stringify({ playerId: userId, ...this.keyState })
      );
    });

    // 키보드 떼기 이벤트 핸들러
    document.addEventListener("keyup", (event) => {
      if (event.keyCode === 37) {
        // 왼쪽 화살표 키
        this.keyState.leftArrow = false;
      } else if (event.keyCode === 39) {
        // 오른쪽 화살표 키
        this.keyState.rightArrow = false;
      }
      this.gameSocket.send(
        JSON.stringify({ playerId: userId, ...this.keyState })
      );
    });
  }

  rotate(x, y, width, height, angle) {
    // 회전의 중심을 사각형의 중심으로 이동
    this.ctx.translate(x + width / 2, y + height / 2);
    // 지정된 각도로 회전
    this.ctx.rotate((angle * Math.PI) / 180);
    // 회전의 중심을 원래 위치로 되돌림
    this.ctx.translate(-(x + width / 2), -(y + height / 2));
  }

  drawText(text, x, y) {
    this.ctx.fillStyle = "BLACK";
    this.ctx.font = "60px 바탕";
    this.ctx.fillText(text, x, y);
  }

  drawArc(x, y, r, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  updateScore(players) {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    if (player1 && player2) {
      player1.innerText = players[0].score;
      player2.innerText = players[1].score;
    }
  }

  initializeGame() {
    this.canvas.width = 700;
    this.canvas.height = 700;

    this.ctx = this.canvas.getContext("2d");

    this.gameSocket = new WebSocket(
      "wss://" + window.location.host + `/ws/game/?mode=2p&userId=${userId}`
    );

    this.gameSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.renderGame(data);
      this.updateScore(data.players);
    };

    this.gameSocket.onclose = function (e) {
      console.error("Game socket closed");
    };
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "flex items-center justify-center min-h-screen";

    // game container
    this.gameContainer = document.createElement("div");
    this.gameContainer.className = "relative";

    // score board
    this.scoreContainer = document.createElement("div");
    this.scoreContainer.className =
      "absolute w-44 h-44 flex-col justify-start items-start gap-8 inline-flex";
    this.scoreContainer.style = "left: 100%; top:0; margin-left: 64px;";

    this.player1 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-default.svg",
      id: "player1",
    });

    this.player2 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-taeypark.svg",
      id: "player2",
    });

    this.scoreContainer.appendChild(this.player1);
    this.scoreContainer.appendChild(this.player2);

    // canvas to draw the game
    this.canvas = document.createElement("canvas");
    this.canvas.className =
      "rounded-3xl border-8 border-primary-card_background dark:border-secondary-card_background shadow-md";

    this.initializeGame();
    this.keyboardEvent();

    // button to exit the game
    this.exitButtonPos = document.createElement("div");
    this.exitButtonPos.className = "absolute top-[85%]";

    this.exitButtonHref = document.createElement("a");
    this.exitButtonHref.setAttribute("href", "/gameMode/");

    this.exitButton = createComponent(BasicButton, { text: "Exit" });

    this.exitButtonHref.appendChild(this.exitButton);
    this.exitButtonPos.appendChild(this.exitButtonHref);

    this.gameContainer.appendChild(this.canvas);
    this.gameContainer.appendChild(this.scoreContainer);
    this.container.appendChild(this.gameContainer);
    this.container.appendChild(this.exitButtonPos);

    return this.container;
  }
}

export default TwoPlayerMode;

// // select canvas element
// const canvas = document.getElementById("game");
// canvas.width = 700;
// canvas.height = 700;

// // getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
// const ctx = canvas.getContext("2d");

// const gameSocket = new WebSocket(
//   "wss://" + window.location.host + `/ws/game/?mode=2p&userId=${userId}`
// );

// gameSocket.onmessage = function (e) {
//   const data = JSON.parse(e.data);
//   // if (data.type == "game_start") {
//   //   const event = new CustomEvent('game_start', { detail: data });
//   //   document.dispatchEvent(event);
//   // }
//   // else {
//   render(data);

//   // score update
//   updateScore(data.players);
//   // }
// };

// gameSocket.onclose = function (e) {
//   console.error("Game socket closed");
// };

// function updateScore(players) {
//   const player1 = document.getElementById("player1");
//   const player2 = document.getElementById("player2");
//   if (player1 && player2) {
//     player1.innerText = players[0].score;
//     player2.innerText = players[1].score;
//   }
// }

// // draw a rectangle, will be used to draw paddles
// function drawRect(x, y, w, h, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, w, h);
// }

// // draw circle, will be used to draw the ball
// function drawArc(x, y, r, color) {
//   ctx.fillStyle = color;
//   ctx.beginPath();
//   ctx.arc(x, y, r, 0, Math.PI * 2, true);
//   ctx.closePath();
//   ctx.fill();
// }

// // draw text
// function drawText(text, x, y) {
//   ctx.fillStyle = "BLACK";
//   ctx.font = "60px 바탕";
//   ctx.fillText(text, x, y);
// }

// function rotate(x, y, width, height, angle) {
//   // 회전의 중심을 사각형의 중심으로 이동
//   ctx.translate(x + width / 2, y + height / 2);
//   // 지정된 각도로 회전
//   ctx.rotate((angle * Math.PI) / 180);
//   // 회전의 중심을 원래 위치로 되돌림
//   ctx.translate(-(x + width / 2), -(y + height / 2));
// }

// let keyState = {
//   leftArrow: false,
//   rightArrow: false,
// };
// // 키보드 누름 이벤트 핸들러
// document.addEventListener("keydown", function (event) {
//   if (event.keyCode === 37) {
//     // 왼쪽 화살표 키
//     keyState.leftArrow = true;
//   } else if (event.keyCode === 39) {
//     // 오른쪽 화살표 키
//     keyState.rightArrow = true;
//   }
//   gameSocket.send(JSON.stringify({ playerId: userId, ...keyState }));
// });

// // 키보드 떼기 이벤트 핸들러
// document.addEventListener("keyup", function (event) {
//   if (event.keyCode === 37) {
//     // 왼쪽 화살표 키
//     keyState.leftArrow = false;
//   } else if (event.keyCode === 39) {
//     // 오른쪽 화살표 키
//     keyState.rightArrow = false;
//   }
//   gameSocket.send(JSON.stringify({ playerId: userId, ...keyState }));
// });

// const backGround = new Image();
// backGround.src = "/static/assets/images/map-pingpong.svg";

// const ballImage = new Image();
// ballImage.src = "/static/assets/images/ball-pingpong.svg";

// // render function, the function that does al the drawing
// function render(data) {
//   // draw backGround
//   if (backGround.complete) {
//     ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
//   } else {
//     backGround.onload = function () {
//       ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
//     };
//   }

//   ctx.save();
//   for (var i = 0; i < data.players.length; i++) {
//     if (userId == data.players[i].playerId) {
//       player = data.players[i];
//     }
//   }

//   rotate(0, 0, canvas.width, canvas.height, player.angle * -1);

//   for (var i = 0; i < data.players.length; i++) {
//     drawRect(
//       data.players[i].x,
//       data.players[i].y,
//       data.players[i].width,
//       data.players[i].height,
//       data.players[i].color
//     );
//   }

//   // draw the ball
//   if (ballImage.complete) {
//     ctx.drawImage(
//       ballImage,
//       data.ball.x - data.ball.radius,
//       data.ball.y - data.ball.radius,
//       data.ball.radius * 2,
//       data.ball.radius * 2
//     );
//   } else {
//     ballImage.onload = function () {
//       ctx.drawImage(
//         ballImage,
//         data.ball.x - data.ball.radius,
//         data.ball.y - data.ball.radius,
//         data.ball.radius * 2,
//         data.ball.radius * 2
//       );
//     };
//   }

//   ctx.restore();

//   if (data.winner) {
//     if (data.winner == userId) {
//       drawText("You Win!", 250, 250);
//     } else {
//       drawText("You Lose!", 250, 250);
//     }
//   }
// }

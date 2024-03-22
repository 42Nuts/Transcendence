import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { ScoreBoard } from "../components/Board/index.js";
import { mapThreeImages, themeImages } from "../config/index.js";
import { Result } from "./Result/index.js";
import { Countdown } from "./Loading/index.js";
import Store from "../store/index.js";

class ThreePlayerMode extends Component {
  constructor(props) {
    super(props);
    this.result = false;
    this.keyState = {
      leftArrow: false,
      rightArrow: false,
    };
    this.backGround = new Image();
    this.backGround.src = mapThreeImages[Store.state.theme];

    this.ballImage = new Image();
    this.ballImage.src = themeImages[Store.state.theme];

    Store.events.subscribe("darkModeChange", this.onDarkModeChange.bind(this));
  }

  onDarkModeChange() {
    if (Store.state.darkMode) {
      this.borderImage.src = "/static/assets/images/border-dark.svg";
    } else {
      this.borderImage.src = "/static/assets/images/border.svg";
    }
  }

  showResult(message) {
    const overlay = createComponent(Result, { result: message });
    overlay.setAttribute("href", "/gameMode/");

    if (!this.result) {
      document.body.appendChild(overlay);
    }

    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
      this.result = false;
    });

    this.result = true;
  }

  renderGame(data) {
    // draw backGround
    // if (this.backGround.complete) {
    //   this.ctx.drawImage(
    //     this.backGround,
    //     0,
    //     0,
    //     this.canvas.width,
    //     this.canvas.height
    //   );
    // } else {
    //   this.backGround.onload = function () {
    //     this.ctx.drawImage(
    //       this.backGround,
    //       0,
    //       0,
    //       this.canvas.width,
    //       this.canvas.height
    //     );
    //   };
    // }

    this.drawTriangle(
      this.canvas.width / 2,
      0,
      0,
      this.canvas.height,
      this.canvas.width,
      this.canvas.height,
      "#000"
    );


    this.ctx.save();

    for (var i = 0; i < data.players.length; i++) {
      if (userId == data.players[i].playerId) {
        player = data.players[i];
      }
    }

    this.rotate(
      0,
      0,
      this.canvas.width,
      2 * this.canvas.height - this.canvas.width / 3 ** 0.5,
      player.angle * -1
    );

    for (var i = 0; i < data.players.length; i++) {
      this.ctx.save();
      this.rotate(
        data.players[i].x,
        data.players[i].y,
        data.players[i].width,
        data.players[i].height,
        data.players[i].angle * -1
      );
      this.drawRect(
        data.players[i].x,
        data.players[i].y,
        data.players[i].width,
        data.players[i].height,
        data.players[i].color
      );
      this.ctx.restore();
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
        this.showResult("win");
      } else {
        this.showResult("lose");
      }
        this.gameSocket.close();
        this.destroy();
    }
  }

  keyboardEvent() {
    this.handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        this.keyState.leftArrow = true;
      } else if (event.keyCode === 39) {
        this.keyState.rightArrow = true;
      }
      this.gameSocket.send(JSON.stringify({ playerId: userId, ...this.keyState }));
    };
  
    this.handleKeyUp = (event) => {
      if (event.keyCode === 37) {
        this.keyState.leftArrow = false;
      } else if (event.keyCode === 39) {
        this.keyState.rightArrow = false;
      }
      this.gameSocket.send(JSON.stringify({ playerId: userId, ...this.keyState }));
    };
  
    // 키보드 이벤트 리스너 연결
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  removeKeyboardEvent() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  rotate(x, y, width, height, angle) {
    // 회전의 중심을 사각형의 중심으로 이동
    this.ctx.translate(x + width / 2, y + height / 2);
    // 지정된 각도로 회전
    this.ctx.rotate((angle * Math.PI) / 180);
    // 회전의 중심을 원래 위치로 되돌림
    this.ctx.translate(-(x + width / 2), -(y + height / 2));
  }

  drawTriangle(x1, y1, x2, y2, x3, y3, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1); // 첫 번째 꼭짓점
    this.ctx.lineTo(x2, y2); // 두 번째 꼭짓점
    this.ctx.lineTo(x3, y3); // 세 번째 꼭짓점
    this.ctx.closePath(); // 경로 닫기 (첫 번째 꼭짓점과 세 번째 꼭짓점 연결)

    this.ctx.fillStyle = color;
    this.ctx.fill();
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

  updateScore(players) {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const player3 = document.getElementById("player3");
    if (player1 && player2 && player3) {
      player1.innerText = players[0].score;
      player2.innerText = players[1].score;
      player2.innerText = players[2].score;
    }
  }

  initializeGame() {
    // select canvas element
    this.canvas.width = 700;
    this.canvas.height = (3 ** 0.5 / 2) * this.canvas.width;

    // getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
    this.ctx = this.canvas.getContext("2d");

    this.gameSocket = new WebSocket(
      "wss://" + window.location.host + `/ws/game/?mode=3p&userId=${userId}`
    );

    this.gameSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type == "game_end") {
        this.showResult("win");
        this.gameSocket.close();
        this.destroy();
        return;
      }

      else if (data.type == "game_start") {
        Store.dispatch("updateGameStart");
        document.body.appendChild(createComponent(Countdown, {}));
        console.log(data.player_ids);
        this.keyboardEvent();
      }

      else {
        this.renderGame(data);
        this.updateScore(data.players);
      }
    };

    this.gameSocket.onclose = function (e) {
      console.error("Game socket closed");
    };

    this.handlePopState = this.closeWebSocketOnBack.bind(this);
    window.addEventListener("popstate", this.handlePopState);
  }

  closeWebSocketOnBack() {
    if (this.gameSocket && this.gameSocket.readyState === WebSocket.OPEN) {
      this.gameSocket.close();
    }
  }

  destroy() {
    // 필요한 경우 페이지를 벗어날 때 호출
    window.removeEventListener("popstate", this.handlePopState);
    this.removeKeyboardEvent();
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

    this.player3 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-yim.svg",
      id: "player3",
    });

    this.scoreContainer.appendChild(this.player1);
    this.scoreContainer.appendChild(this.player2);
    this.scoreContainer.appendChild(this.player3);

    // border

    const border = document.createElement("div");
    border.className = "absolute";

    this.borderImage = document.createElement("img");
    if (Store.state.darkMode) {
      this.borderImage.src = "/static/assets/images/border-dark.svg";
    } else {
      this.borderImage.src = "/static/assets/images/border.svg";
    }
    this.borderImage.className = "w-full h-full";

    border.appendChild(this.borderImage);

    // canvas to draw the game
    this.canvas = document.createElement("canvas");

    this.initializeGame();

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
    this.container.appendChild(border);
    this.container.appendChild(this.exitButtonPos);

    this.exitButton.addEventListener("click", () => {
      // WebSocket 연결이 열려있다면 종료
      if (this.gameSocket && this.gameSocket.readyState === WebSocket.OPEN) {
        this.gameSocket.close();
        console.log("WebSocket connection closed.");
      }
    });

    return this.container;
  }
}

export default ThreePlayerMode;
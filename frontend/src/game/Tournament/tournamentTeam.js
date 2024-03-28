import { Component, createComponent } from "../../core/index.js";
import { BasicButton } from "../../components/Button/index.js";
import { ScoreBoard } from "../../components/Board/index.js";
import { mapImages, themeImages, profileImages } from "../../config/index.js";
import { Result } from "./../Result/index.js";
import { Countdown } from "./../Loading/index.js";
import { TournamentTable, TournamentResult } from "./index.js";
import Store from "../../store/index.js";

class TournamentTeam extends Component {
  constructor(props) {
    super(props);
    this.result = false;
    this.keyState = {
      leftArrow: false,
      rightArrow: false,
    };
    this.backGround = new Image();
    this.backGround.src = mapImages[Store.state.theme];

    this.ballImage = new Image();
    this.ballImage.src = themeImages[Store.state.theme];
  }

  showResult(message) {
    const overlay = createComponent(Result, { result: message });

    if (!this.result) {
      document.body.appendChild(overlay);
    }

    overlay.addEventListener("click", (event) => {
      console.log(Store.state.tournamentMode);
      event.stopPropagation();
      event.preventDefault();
      if (message == "lose") {
        window.location.assign("/home/");
      } else if (message == "win" && Store.state.tournamentMode == 1) {
        const tournamentResult = createComponent(TournamentResult, {
          imageSrc: profileImages[Store.state.profile],
          name: Store.state.nickname,
        });
        this.container.appendChild(tournamentResult);
      }
      Store.dispatch("updateTournamentMode");
      document.body.removeChild(overlay);
      this.result = false;
    });

    this.result = true;
  }

  renderGame(data) {
    // draw backGround
    if (this.backGround.complete) {
      this.ctx.drawImage(
        this.backGround,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    } else {
      this.backGround.onload = function () {
        this.ctx.drawImage(
          this.backGround,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
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
        this.props.gameSocket.close();
        if (data.next_room) {
          Store.dispatch(
            "updateNextRoom",
            `/ws/game/?mode=tournament2&userId=${userId}&nextRoom=${data.next_room}`
          );
        }
        this.showResult("win");
      } else {
        this.props.gameSocket.close();
        this.showResult("lose");
      }
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
      this.props.gameSocket.send(
        JSON.stringify({ playerId: userId, ...this.keyState })
      );
    };

    this.handleKeyUp = (event) => {
      if (event.keyCode === 37) {
        this.keyState.leftArrow = false;
      } else if (event.keyCode === 39) {
        this.keyState.rightArrow = false;
      }
      this.props.gameSocket.send(
        JSON.stringify({ playerId: userId, ...this.keyState })
      );
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
    const player1 = document.getElementById("Score1");
    const player2 = document.getElementById("Score2");

    if (player1 && player2) {
      player1.innerText = players[0].score;
      player2.innerText = players[1].score;
    }
  }

  updateScoreBoard(playerIds) {
    playerIds.forEach((playerId, index) => {
      Promise.all([
        fetch(`/v2/users/${playerId}/profile-index/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
        fetch(`/v2/users/${playerId}/nickname/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
      ])
        .then((data) => {
          const [profileResponse, nicknameResponse] = data;
          const playerImage = document.getElementById(`Img${index + 1}`);
          const playerName = document.getElementById(`Name${index + 1}`);
          if (playerImage && playerName) {
            playerImage.src = profileImages[profileResponse.profile_index];
            playerName.innerText = nicknameResponse.nickname;
          }
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    });
  }

  changePlayerIds(playerIds) {
    const myIndex = playerIds.indexOf(userId);
    let newPlayerIds = [];

    if (myIndex === 0) {
      newPlayerIds = playerIds;
    } else if (myIndex === 1) {
      newPlayerIds = [playerIds[1], playerIds[0], playerIds[3], playerIds[2]];
    } else if (myIndex === 2) {
      newPlayerIds = [playerIds[2], playerIds[3], playerIds[0], playerIds[1]];
    } else if (myIndex === 3) {
      newPlayerIds = [playerIds[3], playerIds[2], playerIds[1], playerIds[0]];
    }

    return newPlayerIds;
  }

  updateMatchTable(playerIds) {
    // 모든 플레이어에 대한 프로미스를 저장할 배열을 선언합니다.
    const promises = [];

    // tournamentMode가 1이면 시작 인덱스를 5로 설정합니다.
    const startIndex = Store.state.tournamentMode === 1 ? 5 : 1;

    // 각 플레이어 ID에 대해 프로필 인덱스와 닉네임을 가져오는 프로미스를 생성합니다.
    playerIds.forEach((playerId, index) => {
      const profilePromise = fetch(`/v2/users/${playerId}/profile-index/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      const nicknamePromise = fetch(`/v2/users/${playerId}/nickname/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      // 각 플레이어에 대한 프로미스를 배열에 추가합니다.
      promises.push(Promise.all([profilePromise, nicknamePromise]));
    });

    // 모든 플레이어의 정보를 가져오는 프로미스가 완료되면, DOM을 업데이트합니다.
    Promise.all(promises)
      .then((results) => {
        results.forEach((data, index) => {
          const [profileResponse, nicknameResponse] = data;
          // Store.state.tournamentMode의 값에 따라 조정된 인덱스를 사용합니다.
          const adjustedIndex = startIndex + index;
          const playerImage = document.getElementById(
            `tournamentCardImage${adjustedIndex}`
          );
          const playerName = document.getElementById(
            `tournamentCardName${adjustedIndex}`
          );
          if (playerImage && playerName) {
            playerImage.src = profileImages[profileResponse.profile_index];
            playerName.innerText = nicknameResponse.nickname;
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching player data:", error);
      });
  }

  initializeGame() {
    this.canvas.width = 700;
    this.canvas.height = 700;

    this.ctx = this.canvas.getContext("2d");

    this.props.gameSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type == "game_end") {
        console.log("game_end");
        this.props.gameSocket.close();
        this.destroy();
        if (Store.state.tournamentMode == 0) {
          Store.dispatch(
            "updateNextRoom",
            `/ws/game/?mode=tournament2&userId=${userId}&nextRoom=${data.next_room}`
          );
        }
        this.showResult("win");
      } else if (data.type == "game_start") {
        console.log(data.player_ids);
        // userId의 위치에 따라 playerIds 배열을 조정합니다.
        let playerIds = data.player_ids;
        if (data.player_ids.length === 4) {
          playerIds = this.changePlayerIds(data.player_ids);
        }
        this.updateScoreBoard(playerIds);
        Promise.all([this.updateMatchTable(playerIds)]).then(() => {
          // 모든 작업이 완료된 후 실행되어야 하는 코드
          Store.dispatch("updateGameStart");
          setTimeout(() => {
            this.container.querySelector("#matchTable").remove();
            document.body.appendChild(createComponent(Countdown, {}));
          }, 3000);
          this.keyboardEvent();
        });
      } else {
        this.renderGame(data);
        this.updateScore(data.players);
      }
    };

    this.props.gameSocket.onclose = function (e) {
      console.log("Game socket closed");
    };

    this.handlePopState = this.closeWebSocketOnBack.bind(this);
    window.addEventListener("popstate", this.handlePopState);
  }

  closeWebSocketOnBack() {
    if (
      this.props.gameSocket &&
      this.props.gameSocket.readyState === WebSocket.OPEN
    ) {
      this.props.gameSocket.close();
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
      tierSrc: "/static/assets/images/tier-bronze.svg",
      name: "Player 1",
      id: "1",
    });

    this.player2 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-default.svg",
      tierSrc: "/static/assets/images/tier-bronze.svg",
      name: "Player 2",
      id: "2",
    });

    this.scoreContainer.appendChild(this.player1);
    this.scoreContainer.appendChild(this.player2);

    // canvas to draw the game
    this.canvas = document.createElement("canvas");
    this.canvas.className =
      "rounded-3xl border-8 border-primary-card_background dark:border-secondary-card_background shadow-md";

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
    this.container.appendChild(this.exitButtonPos);

    this.exitButton.addEventListener("click", () => {
      // WebSocket 연결이 열려있다면 종료
      if (
        this.props.gameSocket &&
        this.props.gameSocket.readyState === WebSocket.OPEN
      ) {
        this.props.gameSocket.close();
        console.log("WebSocket connection closed.");
      }
    });

    // match table
    this.matchTable = document.createElement("div");

    if (Store.state.tournamentMode == 0) {
      this.matchTable = createComponent(TournamentTable, {
        player1Image: "/static/assets/images/profile-default.svg",
        player2Image: "/static/assets/images/profile-default.svg",
        player3Image: "/static/assets/images/profile-default.svg",
        player4Image: "/static/assets/images/profile-default.svg",
        player1Name: "Player 1",
        player2Name: "Player 2",
        player3Name: "Player 3",
        player4Name: "Player 4",
      });
    } else if (Store.state.tournamentMode == 1) {
      this.matchTable = createComponent(TournamentTable, {
        playerLeftImage: "/static/assets/images/profile-default.svg",
        playerRightImage: "/static/assets/images/profile-default.svg",
        playerLeftName: "Left",
        playerRightName: "Right",
      });
    }
    this.matchTable.id = "matchTable";

    this.container.appendChild(this.matchTable);

    return this.container;
  }
}

export default TournamentTeam;

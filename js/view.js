export default class View {
  $ = {};

  $$ = {};

  constructor() {
    this.$.menuBtn = this.#qs("[data-id=menu-btn]");
    this.$.items = this.#qs("[data-id=menu-items]");
    this.$.resetBtn = this.#qs("[data-id=reset-btn]");
    this.$.newRoundBtn = this.#qs("[data-id=new-round-btn]");
    this.$.modal = this.#qs("[data-id=modal]");
    this.$.modalText = this.#qs("[data-id=modal-text]");
    this.$.modalBtn = this.#qs("[data-id=modal-btn]");
    this.$.turn = this.#qs("[data-id=turn]");
    this.$.p1WinsText = this.#qs("[data-id=p1-wins]");
    this.$.tiesText = this.#qs("[data-id=ties]");
    this.$.p2WinsText = this.#qs("[data-id=p2-wins]");
    this.$.turnAudio = this.#qs("[data-id=turn-audio]");
    this.$.audioControl = this.#qs("[data-id=audio-control]");
    this.$.audioControlIcon = this.#qs("[data-id=audio-control-icon]");

    this.$$.squares = this.#qsAll("[data-id=square]");

    // UI only Event Listeners
    this.$.menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#menuToggle();
    });
  }

  //Register All Event Listeners
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  bindGameAudioControl(handler) {
    this.$.audioControl.addEventListener("click", handler);
  }

  //   DOM Helper Methods
  updateScoreBoard(stats) {
    this.$.p1WinsText.innerText = `${stats.playersWithStats[0].wins} Wins`;
    this.$.tiesText.innerText = stats.ties;
    this.$.p2WinsText.innerText = `${stats.playersWithStats[1].wins} Wins`;
  }

  playAudioOnce(audioFileNameWithExt) {
    this.$.turnAudio.src = `../assets/audio/${audioFileNameWithExt}`;
    this.$.turnAudio.play();
  }

  toggleAudioIcon(mute) {
    if (mute) {
      this.$.audioControlIcon.classList.remove("fa-volume-high");
      this.$.audioControlIcon.classList.add("fa-volume-xmark");
    } else {
      this.$.audioControlIcon.classList.remove("fa-volume-xmark");
      this.$.audioControlIcon.classList.add("fa-volume-high");
    }
  }

  toggleNotAllowedClass(square) {
    square.classList.add("not-allowed");

    setTimeout(() => {
      square.classList.remove("not-allowed");
    }, 500);
  }

  #menuToggle() {
    this.$.items.classList.toggle("show");
    this.$.menuBtn.classList.toggle("border");

    const menuIcon = this.$.menuBtn.querySelector("i");
    menuIcon.classList.toggle("active-state");
  }

  openModal(message, mute) {
    if (!mute) {
      if (message === "It's a TIE!") {
        this.playAudioOnce(`game-tie.wav`);
      } else {
        this.playAudioOnce(`game-winner.wav`);
      }
    }
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  #closeMenu() {
    this.$.items.classList.remove("show");
    this.$.menuBtn.classList.remove("border");

    const menuIcon = this.$.menuBtn.querySelector("i");
    menuIcon.classList.remove("active-state");
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  initializeMoves(moves) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.square === +square.id);

      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  setTurnIndicator(player) {
    const turnIcon = document.createElement("i");
    const turnLabel = document.createElement("p");
    turnIcon.classList.add("fa-solid");

    turnLabel.classList.add(player.colorClass);
    turnLabel.innerText = `It's ${player.name}'s Turn!`;
    turnIcon.classList.add(player.iconClass, player.colorClass);

    this.$.turn.replaceChildren(turnIcon, turnLabel);
  }

  handlePlayerMove(squareEl, player) {
    const squareIcon = document.createElement("i");
    squareIcon.classList.add("fa-solid");

    squareIcon.classList.add(player.iconClass, player.colorClass);

    squareEl.replaceChildren(squareIcon);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Count not find the element");

    return el;
  }

  #qsAll(selector, parent) {
    const elList = parent
      ? parent.querySelectorAll(selector)
      : document.querySelectorAll(selector);

    if (!elList) throw new Error("Count not find the element");

    return elList;
  }
}

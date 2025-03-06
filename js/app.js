import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    playerId: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    playerId: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("Live-tic-tac-toe-storage-key", players);

  initView();

  function initView() {
    view.closeAll();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreBoard(store.stats);
    view.initializeMoves(store.game.moves);
  }

  window.addEventListener("storage", () => {
    initView();
  });

  view.bindGameResetEvent((event) => {
    store.resetgame();
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();

    store.resetgame();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    // Checking if the square is already used
    const existingMove = store.game.moves.find(
      (move) => move.square === +square.id
    );

    if (existingMove) {
      return;
    }

    // Place player icon in the squares
    view.handlePlayerMove(square, store.game.currentPlayer);
    // Advancing to next state
    store.playerMove(+square.id);

    // Opening Modal if a player wins
    if (store.game.status.isComplete) {
      const message =
        store.game.status.winner === null
          ? "It's a TIE!"
          : `${store.game.status.winner.name} WON!`;
      view.openModal(message);
      return;
    }

    // Setting the player indicator
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);

const initialState = {
  moves: [],
  history: { currentGames: [], allGames: [] },
  mute: false,
};

export default class Store {
  constructor(storageKey, players) {
    this.storageKey = storageKey;
    this.players = players;
  }

  get stats() {
    const state = this.#getState();
    return {
      playersWithStats: this.players.map((player) => {
        const wins = state.history.currentGames.filter(
          (game) => game.status.winner?.playerId === player.playerId
        ).length;

        return {
          ...player,
          wins,
        };
      }),
      ties: state.history.currentGames.filter(
        (game) => game.status.winner === null
      ).length,
    };
  }

  get game() {
    const state = this.#getState();

    const currentPlayer =
      this.players[state.moves.length === 0 ? 0 : state.moves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    for (const player of this.players) {
      const selectedSquareIds = state.moves
        .filter((move) => move.player.playerId === player.playerId)
        .map((move) => +move.square);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      currentPlayer,
      moves: state.moves,
      status: {
        isComplete: winner !== null || state.moves.length === 9,
        winner,
      },
    };
  }

  get mute() {
    const stateClone = structuredClone(this.#getState());

    return stateClone.mute;
  }

  playerMove(squareId) {
    const stateClone = structuredClone(this.#getState());

    stateClone.moves.push({
      player: this.game.currentPlayer,
      square: squareId,
    });

    this.#saveState(stateClone);
  }

  resetgame() {
    const stateClone = structuredClone(this.#getState());
    const { status, moves } = this.game;

    if (this.game.status.isComplete) {
      stateClone.history.currentGames.push({
        moves,
        status,
      });
    }

    stateClone.moves = [];

    this.#saveState(stateClone);
  }

  newRound() {
    this.resetgame();

    const stateClone = structuredClone(this.#getState());
    stateClone.history.allGames.push(...stateClone.history.currentGames);

    stateClone.history.currentGames = [];

    this.#saveState(stateClone);
  }

  toggleAudio() {
    const stateClone = structuredClone(this.#getState());
    stateClone.mute = !stateClone.mute;

    this.#saveState(stateClone);
  }

  #getState() {
    const item = window.localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : initialState;
  }

  #saveState(stateOrFn) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;
      default:
        throw new Error("Invalid argument passed to saveState");
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(newState));
  }
}

# Tic-Tac-Toe | Vanilla Js

A simple Tic Tac Toe web application built using HTML, CSS, and JavaScript following the MVC (Model-View-Controller) architecture. The game stats are stored in `localStorage`, allowing users to resume their game even after a page refresh.

## Features

- **Interactive Gameplay** – Play Tic Tac Toe against another player.
- **MVC Architecture** – Clean separation of concerns for better maintainability.
- **Persistent Game State** – Game progress is saved in `localStorage`.
- **Responsive Design** – Works seamlessly on different screen sizes.

## Technologies Used

- **HTML** – Structure of the game UI.
- **CSS** – Styling and layout.
- **JavaScript (ES6)** – Game logic and event handling.
- **LocalStorage** – Persist game state and statistics.

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:MdZaferEqbal/tic-tac-toe-vanilla-js.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tic-tac-toe-vanilla-js
   ```
3. Open `index.html` in your browser.

## Usage

- Click on any cell to make a move.
- The game alternates turns between "X" and "O".
- The winner is announced when a player gets three in a row.
- If the page is refreshed, the game will resume from where it was left.
- Click "Reset Game" to start a new match.
- Click "New Round" to start a new round(removes older game stats).

## Project Structure

```
📂 tic-tac-toe-mvc/
├── 📁 assets/
    ├── audio/              # Contains audio files
    ├── img/                # Contains image files
    └── video/              # Contains video files
├── 📁 css/
│   ├── index.css           # Global css
│   └── montserrat-font.css # Montserrat Font css
├── 📁 js/
│   ├── app.js              # Controller in the MVC pattern, handling user interactions and coordinating updates between the model and view.
│   ├── fontawesome.js      # Manages UI updates
│   ├── store.js            # Model in the MVC pattern, managing the game state and storing data in local storage.
│   └── view.js             # View in the MVC pattern, rendering the UI and updating elements based on the game state.
├── index.html              # Main enrty point
├── README.md               # Project documentation
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a Pull Request.

---

### 🌟 Show Your Support

If you like this game, consider giving it a ⭐ on [GitHub](git@github.com:MdZaferEqbal/tic-tac-toe-vanilla-js.git)!

Enjoy the game! 🎮

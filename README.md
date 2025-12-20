# ARG Project: Frozen Coordinates (v2.0)

## Overview
This is an ARG (Alternate Reality Game) website for "Frozen Coordinates".
Players act as digital detectives to uncover the truth behind the 2014 mountaineering accident.

## Architecture
- **Frontend**: HTML5, CSS3, Vanilla JS.
- **Hosting**: Static file serving (Nginx/Apache).
- **Logic**: Client-side logic for puzzles (URL hacking, Base64 decoding, Coordinate calculation).

## Project Structure
- `archive.html`: The 2014 legacy site (The Hub).
- `index.html`: The modern university entrance (Redirects to legacy).
- `gallery.html`: Contains the hidden Clue #1 (Source Code Comment).
- `log_view.html`: Contains Clue #2 & #3 (URL Hacking & Base64).
- `cma.html`: The Finale (Rescue Terminal Input).
- `js/`: Modular JavaScript logic.
- `css/`: Stylesheets.

## Setup & Run
1. **Local**: Open `index.html` in a browser.
2. **Docker**:
   ```bash
   docker build -t arg-game .
   docker run -p 8080:80 arg-game
   ```

## Testing
Run unit tests with Jest:
```bash
npm install
npm test
```

## Changelog v2.0
- **Refactored**: Split monolithic JS into `log_data.js`, `log_renderer.js`, `rescue_terminal.js`.
- **New Feature**: "Rescue Calibration" terminal in `cma.html`.
- **New Feature**: Base64 encoded draft log in `log_view.html`.
- **Optimization**: Lazy loading logic for audio and logs.

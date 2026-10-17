# Arcade starter

The starting point for the Day 2 arcade. One repo for the whole team, run on one laptop (the arcade laptop).

## Set up (the manager, once)
1. Create a repo called `arcade` in your personal space on Worldline's GitLab, and give your team access.
2. Copy everything in this folder into it (including the hidden `.claude` folder), commit and push.
3. On the arcade laptop: clone it, then run `node serve.js` and open http://localhost:8080

## What's in it
| File | What |
|---|---|
| `arcade.js` | The contract: `Arcade.submitScore()`, `Arcade.topScores()`, `Arcade.games()`. Don't change it. |
| `.claude/skills/arcade-score/` | The skill that connects a game to the arcade. |
| `serve.js` | The arcade server. No install needed. |
| `index.html` | The start screen. Empty: Assignment 15. |
| `scoreboard.html` | The scoreboard. Empty: Assignment 13. |
| `games/example/` | A tiny example of a connected game. |
| `tests/` | Tests for the contract: `npm test`. |

## Every player
Copy your game into `games/<game>-<your name>/`, then ask Claude Code: *"Use the arcade-score skill to connect my game in games/<folder>."*

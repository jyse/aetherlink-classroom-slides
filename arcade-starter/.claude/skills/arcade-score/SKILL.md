---
name: arcade-score
description: Connect a game to the team arcade so it reports its score at game over. Use when a game must join the arcade, send a score, or show up on the scoreboard or start screen.
---

# arcade-score: connect a game to the arcade

The arcade has one contract: `arcade.js` in the root of the arcade repo. Every game uses it. **Never change `arcade.js`**: every game and the scoreboard depend on it.

## The score
At game over, the game calls exactly once:

```js
Arcade.submitScore({ player, avatar, points, game })
```

| Field | What | Example |
|---|---|---|
| `player` | the player's name, 1 to 20 characters | `"Cons"` |
| `avatar` | path to the player's picture, from the root | `"/games/snake-cons/avatar.png"` |
| `points` | whole number, 0 or more | `42` |
| `game` | the name of the game | `"Snake"` |

A score that breaks these rules is rejected with an error. Fix the game, never the contract.

## Steps to connect a game
1. The game lives in its own folder: `games/<game>-<player>/`, for example `games/snake-cons/`.
2. Put the player's picture in that folder, for example `avatar.png`.
3. Add `game.json` to that folder:
   ```json
   { "game": "Snake", "player": "Cons", "avatar": "avatar.png", "entry": "index.html" }
   ```
4. In the game's HTML, load the contract before the game's own script: `<script src="../../arcade.js"></script>`
5. At game over, call `Arcade.submitScore(...)` once, with the fields above.
6. Add a link back to the arcade: `<a href="/">Back to the arcade</a>`.

Look at `games/example/` for a working example.

## Check before you say it's done
- `npm test` passes (it tests the contract).
- Start the arcade with `node serve.js`, open http://localhost:8080/games.json: the game is in the list.
- Play one round: the score shows on `scoreboard.html`, with the right picture and name.
- Show the human the changed files and wait for approval before committing.

## Boundaries
- Only change files inside the game's own folder in `games/`.
- Don't touch `arcade.js`, `serve.js`, `tests/` or other players' folders.
- No AI connection, internet API or external server inside a game.

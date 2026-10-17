/* Arcade contract v1. Every game in the arcade reports its score through this file.
   Don't change it on your own: the whole team depends on it. */
(function () {
  const KEY = 'arcade.scores.v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
  function check(s) {
    const errors = [];
    if (!s || typeof s !== 'object') return ['score must be an object'];
    if (typeof s.player !== 'string' || !s.player.trim() || s.player.length > 20) errors.push('player: a name of 1 to 20 characters');
    if (typeof s.avatar !== 'string' || !s.avatar.trim()) errors.push('avatar: the path to your picture');
    if (!Number.isInteger(s.points) || s.points < 0) errors.push('points: a whole number, 0 or more');
    if (typeof s.game !== 'string' || !s.game.trim()) errors.push('game: the name of the game');
    return errors;
  }
  const Arcade = {
    /* Call this once, at game over: Arcade.submitScore({ player, avatar, points, game }) */
    submitScore(score) {
      const errors = check(score);
      if (errors.length) throw new Error('Arcade score rejected: ' + errors.join('; '));
      const all = read();
      all.push({ player: score.player.trim(), avatar: score.avatar, points: score.points, game: score.game.trim(), at: new Date().toISOString() });
      localStorage.setItem(KEY, JSON.stringify(all));
      return true;
    },
    /* The best scores, highest first. Optional: only one game. */
    topScores(n = 10, game) {
      return read().filter(s => !game || s.game === game).sort((a, b) => b.points - a.points || a.at.localeCompare(b.at)).slice(0, n);
    },
    /* The games in the arcade, from games/<name>/game.json (served by serve.js as /games.json) */
    async games() { const r = await fetch('/games.json', { cache: 'no-store' }); return r.json(); },
    clear() { localStorage.removeItem(KEY); },
    check
  };
  if (typeof module !== 'undefined') module.exports = Arcade; else window.Arcade = Arcade;
})();

/* The arcade server: run `node serve.js` on the arcade laptop and open http://localhost:8080
   No install needed. It serves this folder and lists the games at /games.json. */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, PORT = Number(process.env.PORT) || 8080;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };
function games() {
  const dir = path.join(ROOT, 'games');
  return fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => {
    try { const g = JSON.parse(fs.readFileSync(path.join(dir, d.name, 'game.json'), 'utf8')); return { folder: d.name, ...g, url: '/games/' + d.name + '/' + (g.entry || 'index.html'), avatarUrl: '/games/' + d.name + '/' + g.avatar }; }
    catch { return null; }
  }).filter(Boolean);
}
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/games.json') { res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); return res.end(JSON.stringify(games())); }
  let file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => console.log('Arcade running: http://localhost:' + PORT));

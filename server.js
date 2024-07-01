const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors'); // Import CORS middleware

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Use CORS middleware
    const corsOptions = {
      origin: '*', // Change to your client's domain if possible
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    const corsMiddleware = cors(corsOptions);

    // Apply CORS middleware
    corsMiddleware(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

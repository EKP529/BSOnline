const express = require('express');
const app = express();
const db = require('./dbConfig.json');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetWinRecords
apiRouter.get('/winRecords', async (req, res) => {
  const winRecords = await db.getWinRecords();
  res.send(winRecords);
});

// SubmitWinRecord
apiRouter.post('/winRecord', async (req, res) => {
  db.addWinRecord(req.body);
  const winRecords = await db.getWinRecords();
  res.send(winRecords);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
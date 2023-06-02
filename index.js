const express = require('express');
const app = express();

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
apiRouter.get('/winRecords', (req, res) => {
  res.send(winRecords);
});

// SubmitWinRecord
apiRouter.post('/winRecord', (req, res) => {
  winRecords = updateWinRecords(req.body, winRecords);
  res.send(winRecords);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let winRecords = [];
function updateWinRecords(newRecord, winRecords) {
  winRecords = winRecords.filter((record) => {
    return record.username !== newRecord.username;
  });
  let found = false;
  for (const [i, prevRecord] of winRecords.entries()) {
    if (newRecord.wins > prevRecord.wins) {
      winRecords.splice(i, 0, newRecord);
      found = true;
      break;
    }
  }
  if (!found) {
    winRecords.push(newRecord);
  }
  if (winRecords.length > 10) {
    winRecords.length = 10;
  }
  
  return winRecords;
}
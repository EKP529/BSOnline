const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const db = require('./database.js');

const authCookieName = 'token';
// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await db.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await db.addUser(req.body.username, req.body.password);
    
    // Set the cookie
    setAuthCookie(res, user.token);
    
    res.send({
      id: user._id,
    });
  }
});

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
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
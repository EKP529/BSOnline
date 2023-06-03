const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('bsonline');
const users = db.collection('users');
const winRecords = db.collection('winRecords');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});
function getUser(username) {
  return users.findOne({ username: username });
}

function getUserByToken(token) {
  return users.findOne({ token: token });
}
async function addUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await users.insertOne(user);
  
  return user;
}
async function addWinRecord(record) {
  await winRecords.findOneAndDelete({username:`${record.username}`});
  return await winRecords.insertOne(record);
}

function getWinRecords() {
  const query = { wins: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { wins: -1 },
    limit: 10,
  };
  const cursor = winRecords.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  addWinRecord,
  getWinRecords,
};
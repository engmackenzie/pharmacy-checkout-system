require('dotenv').config();

const { MongoClient } = require('mongodb');
const { NODE_ENV, DB_PROD, DB_TEST } = process.env;

const dbURL = NODE_ENV === 'test' ? DB_TEST : DB_PROD;

let client;
const connect = MongoClient.connect(dbURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then((mongoClient) => {
  client = mongoClient;

  client.on('close', async () => {
    console.info('DB client is closing...');
    process.exit(11);
  });

  client.on('reconnect', () => {
    console.info('DB Client is reconnecting...');
  });

  client.on('error', () => {
    console.error(`DB client encountered an error..`);
  });

  console.info('Database connection established...');
  return client.db();
}).catch((error) => {
  console.log('Error occurred while connecting to DB: ', error.message);
  console.log('Exiting process!');
  process.exit(11);
});


// Disconnect when the Node process is ended with <Ctrl>+C
process.on('SIGINT', () => {
  client.close().then(() => {
    console.info('Disconnected from Mongo Database Server on application SIGINT');
    process.exit(0);
  });
});

// Disconnect when the Node process is killed
process.on('SIGTERM', () => {
  client.close().then(() => {
    console.info('Disconnected from Mongo Database Server on application SIGTERM');
    process.exit(0);
  });
});

module.exports = connect;
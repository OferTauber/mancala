const PASSWORD = process.env.PORT
  ? process.env.PASSWORD
  : require('./dev/mongo_password');

const RapidAPI_KEY = process.env.PORT
  ? process.env.RapidAPI_KEY
  : require('./dev/RapidAPI_KEY');

module.exports = { RapidAPI_KEY, PASSWORD };

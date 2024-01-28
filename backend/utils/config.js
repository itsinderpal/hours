require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI =
    process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PRODUCTION
    : process.env.MONGO_URI_DEVELOPMENT;

module.exports = {
  PORT,
  MONGO_URI,
};

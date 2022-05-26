const ALLOWED_ORIGINS = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;

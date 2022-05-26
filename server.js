require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConnection");
const corsOptions = require("./config/corsOptions");

const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();
const PORT = process.env.SERVER_PORT;

connectDB();

app.use(logger);

app.use(credentials);
// app.use(cors());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

//static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

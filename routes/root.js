const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => res.send({ message: "hello world!" }));

module.exports = router;

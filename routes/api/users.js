const express = require("express");
const ROLES_LIST = require("../../config/rolesList");
const usersControllers = require("../../controllers/usersControllers");
const verifyRoles = require("../../middleware/verifyRoles");
const router = express.Router();

router
  .route("/")
  .get(usersControllers.getAllUsers)
  .delete(usersControllers.deleteUser);
// router
//   .route("/")
//   .get(verifyRoles(ROLES_LIST.Admin), usersControllers.getAllUsers)
//   .delete(verifyRoles(ROLES_LIST.Admin), usersControllers.deleteUser);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersControllers.getUser);

module.exports = router;

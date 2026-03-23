const router = require("express").Router();
const { getUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");

// Only admin should access
router.get("/", auth, getUsers);

module.exports = router;
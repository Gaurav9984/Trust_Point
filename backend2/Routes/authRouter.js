const { signUpValidation, loginValidation } = require("../middleware/authValidation");
const { signUp, login, me } = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signUpValidation, signUp);
// keep /register endpoint for frontend compatibility and validate it the same way
router.post("/register", signUpValidation, signUp);
router.get("/me", me);

module.exports = router;
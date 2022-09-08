
const Router = require('express');
const RouterController = require("../controllers/user-controller");
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middlewares');

const router  = new Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    RouterController.registration
);
router.post("/login",RouterController.login );
router.post("/logout",RouterController.logOut );
router.get("/activate/:link",RouterController.activate );
router.get("/refresh",RouterController.refresh );
router.get("/users",authMiddleware ,RouterController.getAllUsers );


module.exports = router;
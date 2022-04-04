const router = require('express').Router();
const { authClient } = require('./routesDependencies').default;
const cookieParser = require("cookie-parser");

router.use(cookieParser());

/**
 * @note All routes regarding local signup OR using Oauth sign-in should be listed below. 
 */

router.post("/signup", authClient.signup);
router.post("/login", authClient.login);
router.get("/logout", authClient.logout);

module.exports = router;

const router = require('express').Router();
const { authClient } = require('./routesDependencies').default;
const tool = require("../../tool");
const bcrypt = require("bcrypt");
const body_parser = require("body-parser");
const session = require('express-session');

router.use(body_parser.json());
router.use(session({secret: "mySession", resave: true, saveUninitialized: false}));

// /**
//  * @swagger
//  * /auth/login:
//  *  post:
//  *    tags:
//  *      - Authentication
//  *    name: Local Login API
//  *    summary: Based on user's data, this api sent jwt token which leads to login process.
//  *    consumes:
//  *      - application/json
//  *    produces:
//  *      - application/json
//  *    parameters:
//  *      - name: Body Data
//  *        in: body
//  *        schema:
//  *         type: object
//  *         properties:
//  *          email: 
//  *            type: string
//  *          password:
//  *            type: string
//  *        required:
//  *         - email
//  *         - password
//  *    responses:
//  *      200:
//  *        description: JWT token will be in response.
//  *      500:
//  *        description: Internal server error.
//  */
// router.post('/login', dependencies.authClient.login);

/**
 * @note All routes regarding local signup OR using Oauth sign-in should be listed below. 
 */

 router.post("/signup", authClient.signup);

router.post("/login", authClient.login);

router.get("/logout", (req, res) => {
    if(req.session.user == undefined) {
        authClient.logout(false, res);
    } else {
        req.session.destroy();
        authClient.logout(true, res);
    }
});

module.exports = router;

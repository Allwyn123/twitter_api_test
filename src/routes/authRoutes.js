const router = require('express').Router();
const { appController } = require('./routesDependencies').default;
const tool = require("../../tool");
const body_parser = require("body-parser");

router.use(body_parser.json());

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

 router.post("/signup", (req, res) => {
    const create = tool.create_doc(req.body);
    appController.send_func(create, res);
});

module.exports = router;

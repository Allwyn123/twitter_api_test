const router = require('express').Router();
const { authClient } = require('./routesDependencies').default;

/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - Registration
 *    name: Signup API
 *    summary: Based on user's data, this api sent json message.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Body Data
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          user_name: 
 *            type: string
 *          name: 
 *            type: string
 *          phone: 
 *            type: integer
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        required:
 *         - user_name
 *         - name
 *         - phone
 *         - email
 *         - password
 *    responses:
 *      201:
 *        description: User Created message will be in response.
 *      409:
 *        description: User Existed message will be in response.
 *      500:
 *        description: Internal server error.
 */

router.post("/signup", authClient.signup);

/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - Authentication
 *    name: Login API
 *    summary: Based on user's data, this api sent jwt token which leads to login process.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Body Data
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          email: 
 *            type: string
 *          password:
 *            type: string
 *        required:
 *         - email
 *         - password
 *    responses:
 *      200:
 *        description: Login message and JWT token will be in response.
 *      500:
 *        description: Internal server error.
 */
router.post("/login", authClient.login);

module.exports = router;

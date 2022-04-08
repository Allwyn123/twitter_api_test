const router = require('express').Router();
const { appController } = require('./routesDependencies').default;
const { token_check } = require("../helpers/utils");

/**
 * @swagger
 * /profile:
 *  get:
 *    tags:
 *      - View User Profile
 *    name: User Profile API
 *    summary: This api sent user profile data in json.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200: 
 *        description: User profile data will be in response.
 *      401:
 *        description: Unauthorized.
 *      500:
 *        description: Internal server error.
 */
router.get("/profile", token_check, appController.userProfile);

/**
 * @swagger
 * /profile:
 *  put:
 *    tags:
 *      - Update profile
 *    name: Update profile API
 *    summary: Based on user's data, this api update user profile.
 *    security:
 *      - bearerAuth: [] 
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
 *    responses:
 *      200:
 *        description: Updated message will be in response.
 *      400:
 *        description: Bad Request.
 *      404:
 *        description: Data not Found.
 *      500:
 *        description: Internal server error.
 */
router.put("/profile", token_check, appController.updateUserProfile);

/**
 * @swagger
 * /profile:
 *  delete:
 *    tags:
 *      - Delete profile
 *    name: Delete User profile API
 *    summary: This api delete user profile.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Deleted message will be in response.
 *      404:
 *        description: Data not Found.
 *      500:
 *        description: Internal server error.
 */
router.delete("/profile", token_check, appController.deleteUserProfile);

// tweets routes

/**
 * @swagger
 * /profile/tweets:
 *  post:
 *    tags:
 *      - Create tweets
 *    name: Create Tweets API
 *    summary: Based on user's data, this api Create tweet message.
 *    security:
 *      - bearerAuth: [] 
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
 *          tweet_message: 
 *            type: string
 *    responses:
 *      201:
 *        description: Tweet created message will be in response.
 *      500:
 *        description: Internal server error.
 */
router.post("/profile/tweets", token_check, appController.createTweet);

/**
 * @swagger
 * /profile/timeline:
 *  get:
 *    tags:
 *      - Timeline
 *    name: Timeline API
 *    summary: This api sent Timeline tweets.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Timeline tweets will be in response.
 *      404:
 *        description: Data not found.
 *      500:
 *        description: Internal server error.
 */
router.get("/profile/timeline", token_check, appController.timeline);


/**
 * @swagger
 * /profile/tweets/{id}:
 *  put:
 *    tags:
 *      - Update tweets
 *    name: Update Tweets API
 *    summary: Based on tweet id in path, this api update tweet message.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *           type: integer
 *          required: true
 *        - in: body
 *          name: Body Data
 *          schema:
 *           type: object
 *           properties:
 *            tweet_message: 
 *              type: string
 *          required: true
 *    responses:
 *      200:
 *        description: Tweet updated message will be in response.
 *      404:
 *        description: Data not found.
 *      500:
 *        description: Internal server error.
 */
router.put("/profile/tweets/:id", token_check, appController.updateTweet);

/**
 * @swagger
 * /profile/tweets/{id}:
 *  delete:
 *    tags:
 *      - Delete tweets
 *    name: Delete Tweets API
 *    summary: Based on tweet id in path, this api delete tweet message.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *           type: integer
 *          required: true
 *    responses:
 *      200:
 *        description: Tweet delete message will be in response.
 *      404:
 *        description: Data not found.
 *      500:
 *        description: Internal server error.
 */
router.delete("/profile/tweets/:id", token_check, appController.deleteTweet);

/**
 * @swagger
 * /profile/timeline/{sort}:
 *  get:
 *    tags:
 *      - Timeline sort
 *    name: Timeline Sort API
 *    summary: Based on option sort data in path, this api sorted data.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *        - in: path
 *          name: sort
 *          schema: 
 *           type: string
 *          required: true
 *    responses:
 *      200:
 *        description: timeline sorted tweets will be in response.
 *      404:
 *        description: Data not found.
 *      500:
 *        description: Internal server error.
 */
router.get("/profile/timeline/:sort", token_check, appController.timelineSort);


/**
 * @swagger
 * /profile/tweets/{id}/like:
 *  get:
 *    tags:
 *      - Tweet like
 *    name: Tweet Like API
 *    summary: Based on id in path, this api like tweets.
 *    security:
 *      - bearerAuth: [] 
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *           type: integer
 *          required: true
 *    responses:
 *      200:
 *        description: tweets like add message will be in response.
 *      404:
 *        description: Data not found.
 *      500:
 *        description: Internal server error.
 */
router.put("/profile/tweets/:id/like", token_check, appController.likeTweet);

module.exports = router;

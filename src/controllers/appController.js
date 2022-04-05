const utils = require("../helpers/utils");
const errorMsg = require("../helpers/errorMessage").errorMessages;
const { User } = require("../models/userModel");
const { Tweet } = require("../models/tweetModel");
const jwt = require("jsonwebtoken");

/**
 * Send data/message as Response
 * @param {Promise} param 
 * @param {Response} res 
 */
 exports.send_func = (param, res) => {
    param.then(e => {
        if(e) res.send(utils.responseMsg(null, true, e));
        if(!e) res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    })
    .catch(err => res.send(utils.responseMsg(err, false, null)));
}


/**
 * Send error message as Response
 * @param {Status Code} status_code 
 * @param {Response} res 
 */
 exports.error_func = (status_code, res) => {
    if(status_code == 404) {
        res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
    
    if(status_code == 401) {
        res.status(401).send(utils.responseMsg(errorMsg.unauthorized, false, null));
    }

    if(status_code == 500) {
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
 * @description find user data.
 * @function findFunc
 * @param {String} opt model name
 * @param {Object} findData 
 * @returns user/tweet data
 */
const findFunc = async (opt, findData) => {
    try{
        if(opt == "user") {
            if(findData == undefined) {
                const data = await User.find();
                return data;
            } else {
                const data = await User.findOne(findData);
                return data;
            }
        }
        if(opt == "tweet") {
            if(findData == undefined) {
                const data = await Tweet.find();
                return data;
            } else {
                const data = await Tweet.find(findData);
                return data;
            }
        }
    }
    catch(err) {
        console.error("error", err.stack);
        return res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
 };

/**
 * @description token verification controller.
 * @function token_check
 */
 exports.token_check = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token == null) return res.status(401).send(utils.responseMsg(errorMsg.unauthorized, false, null));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        req.user = user;
        next();
    });
};

/**
 * @description get userProfile controller.
 * @function userProfile
 */
 exports.userProfile = async (req, res) => {
    try {
        const userData =  await findFunc("user", {user_name: req.user.user_name});
        if(userData != null) res.send(utils.responseMsg(null, true, userData));
        else res.status(401).send(utils.responseMsg(errorMsg.unauthorized, false, null));
        
    } catch (err) {
        console.error("error", err.stack);
        return res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
 * @description update userProfile controller.
 * @function updateUserProfile
 */
 exports.updateUserProfile = async (req, res) => {
    try {
        const userData = await findFunc("user" ,{user_name: req.user.user_name});
        if(userData != null) {
            const doc = req.body;
            const password_exist = doc.hasOwnProperty("password");
            if(password_exist) {
                doc.password = await bcrypt.hash(doc.password, 10);
                await User.updateOne({user_name: userData.user_name}, {$set: doc});

            } else await User.updateOne({user_name: userData.user_name}, {$set: doc});
            
            const msg = "Updated";
            res.send(utils.responseMsg(null, true, msg));
        
        } else {
            res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        }
    } catch(err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
}

/**
 * @description delete userProfile controller.
 * @function deleteUserProfile
 */
 exports.deleteUserProfile = async (req, res) => {
    try {
        const userData = await findFunc("user", {user_name: req.user.user_name});
        if(userData != null) {
            await User.deleteOne({user_name: userData.user_name});
            res.clearCookie("jwt");
            const msg = "User Deleted";
            res.send(utils.responseMsg(null, true, msg));
        } else {
            res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        }
    } catch (err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
* @description create tweet controller.
* @function createTweet
*/
exports.createTweet = async (req, res) => {
    try {
        const obj = req.body;
        const tweet_count = await Tweet.find().count();
        if(tweet_count != 0) {
            const id = tweet_count + 1;
            obj.t_id = id;
        } else obj.t_id = 1;
    
        obj.user_name = req.user.user_name;
    
        const mydata = new Tweet(obj);
        await mydata.save();
        const msg = "Tweet Created";
        res.status(201).send(utils.responseMsg(null, true, msg));
        
    } catch (err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
* @description timeline controller.
* @function timeline
*/
exports.timeline = async (req, res) => {
    try {
        const tweetData = await findFunc("tweet", {user_name: req.user.user_name});
        if(tweetData.length != 0) {
            res.send(utils.responseMsg(null, true, tweetData));
        } else {
            res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        }
        
    } catch (err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
* @description update tweet controller.
* @function updateTweet
*/
exports.updateTweet = async (req, res) => {
    try {
        const para_id = parseInt(req.params.id);
        const tweetData = await findFunc("tweet", {t_id: para_id});
    
        if(tweetData.length != 0) {
            await Tweet.updateOne({t_id: tweetData[0].t_id}, {$set: req.body}); 
            const msg = "Tweet Updated";
            res.send(utils.responseMsg(null, true, msg));

        } else {
            res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        }
        
    } catch (err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
* @description delete tweet controller.
* @function deleteTweet
*/
exports.deleteTweet = async (req, res) => {
    try {
        const para_id = parseInt(req.params.id);
        const tweetData = await findFunc("tweet", {t_id: para_id});
    
        if(tweetData.length != 0) {
            await Tweet.deleteOne({t_id: tweetData[0].t_id}); 
            const msg = "Tweet Deleted";
            res.send(utils.responseMsg(null, true, msg));
        } else {
            res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
        }
        
    } catch (err) {
        console.error("error", err.stack);
        res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};
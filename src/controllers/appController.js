const utils = require("../helpers/utils");
const errorMsg = require("../helpers/errorMessage").errorMessages;
const { User } = require("../models/userModel");
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
 * @function userFind
 */
const userFind = async (findData) => {
    try{
        if(findData == undefined) {
            const data = await User.find();
            return data;
        } else {
            const data = await User.findOne(findData);
            return data;
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
        const userData =  await userFind({user_name: req.user.user_name});
        if(userData != null) res.send(utils.responseMsg(null, true, userData));
        else res.status(401).send(utils.responseMsg(errorMsg.unauthorized, false, null));
        
    } catch (err) {
        console.error("error", err.stack);
        return res.status(500).send(utils.responseMsg(errorMsg.internalServerError, false, null));
    }
};

/**
 * @description update userProfile controller.
 * @function userProfile
 */
 exports.updateUserProfile = async (req, res) => {
    try {
        const userData = await userFind({user_name: req.user.user_name});
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
const utils = require("../helpers/utils");
const errorMsg = require("../helpers/errorMessage").errorMessages;

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
}
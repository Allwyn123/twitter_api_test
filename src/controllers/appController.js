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
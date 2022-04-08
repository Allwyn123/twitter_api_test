const errorMsg = require("./errorMessage").errorMessages;
const jwt = require("jsonwebtoken");

/**
 * Pass Object Or Array Or String Or Number and find if it is empty or not, Null Or Undefined also gives false
 * @param  {Any} data data to be checked against
 * @param  {function} cb callback
 * @return {Any} data which is given if it exists or False
 */
exports.checkIfDataExists = (data) => {
  let flagDataExists;
  if (data === 0 ? '0' : data) {
    switch (data.constructor) {
      case Object:
        flagDataExists = Object.keys(data).length ? true : false;
        break;
      case Array:
        flagDataExists = data.length ? true : false;
        break;
      default:
        flagDataExists = true;
        break;
    }
    if (flagDataExists) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/**
 * @param {Boolean} errMsg
 * @param {Boolean} successStatus
 * @param {Array or Object} data
 * @param {Boolean} paginated
 * @returns {Object}
 */
const responseMsg = (errMsg, successStatus, data, paginated) => {
  const responseObj = {
    success: successStatus || false,
    error: errMsg || null,
    data: data || null,
  };

  if (errMsg) {
    return responseObj;
  }

  if (paginated) {
    responseObj.data = data.docs;
    responseObj.page = data.page;
    responseObj.totalDocs = data.totalDocs;
    responseObj.limit = data.limit;
    responseObj.totalPages = data.totalPages;
    responseObj.hasPrevPage = data.hasPrevPage;
    responseObj.hasNextPage = data.hasNextPage;
    responseObj.prevPage = data.prevPage;
    responseObj.nextPage = data.nextPage;
  } else {
    responseObj.data = data.docs || data;
  }

  return responseObj;
};

exports.responseMsg = responseMsg;

/**
 * @description token verification controller.
 * @function token_check
 */
 exports.token_check = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1];

  if (token == null) return res.status(401).send(responseMsg(errorMsg.unauthorized, false, null));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(404).send(responseMsg(errorMsg.dataNotFound, false, null));
    req.user = user;
    next();
  });
};
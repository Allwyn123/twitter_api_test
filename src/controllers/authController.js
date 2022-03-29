const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

// /**
//  * @description Local login controller.
//  * @function login
//  */
// exports.login = async (req, res) => {
//   try {

//     const {
//       email,
//       password
//     } = req.body;
    
//     //Please replace dummy payload with your actual object for creating token.
//     let message = {
//       'msg': 'Login Successful.',
//       'token': authService.createToken({email, password})
//     };
//     res.send(utils.responseMsg(null, true, message));
//   } catch (error) {
//     console.error('error', error.stack);
//     res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
//   }
// };

/**
 * @description Local login controller.
 * @function login
 * @param {Status Code} status_code 
 * @param {Response} res 
 */
 exports.login = (status_code, error, msg, res) => {
  if(error) {
      if(status_code == 404) {
          res.status(404).send(utils.responseMsg(msg, false, null))
      }
      
      if(status_code == 401) {
          res.status(401).send(utils.responseMsg(msg, false, null))
      }

      if(status_code == 500) {
        res.status(500).send(utils.responseMsg(msg, false, null));
      }
  } else {
      res.send(utils.responseMsg(null, true, msg));
  }
}

/**
 * @description Local logout controller.
 * @function logout
 * @param {Status Code} status_code 
 * @param {Response} res 
 */
 exports.logout = async (login, res) => {
   try { 
     if(login) {
       const message = { message: "logout" };
       res.send(utils.responseMsg(null, true, message));
     } else {
      const message = { message: "User not founded for logout" };
      res.status(404).send(utils.responseMsg(message, false, null));
     }
   } catch(err) {
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
   }
}

/**
 * @description Local signup controller.
 * @function signup
 * @param {Promise} param 
 * @param {Response} res 
 */
 exports.signup = (param, res) => {
  param.then(e => {
      if(e) res.send(utils.responseMsg(null, true, e));
      if(!e) res.status(404).send(utils.responseMsg(errorMsg.dataNotFound, false, null));
  })
  .catch(err => res.send(utils.responseMsg(err, false, null)));
}
const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');
const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');

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

// /**
//  * @description Local login controller.
//  * @function login
//  * @param {Status Code} status_code 
//  * @param {Response} res 
//  */
//  exports.login = (status_code, error, msg, res) => {
//   if(error) {
//       if(status_code == 404) {
//           res.status(404).send(utils.responseMsg(msg, false, null))
//       }
      
//       if(status_code == 401) {
//           res.status(401).send(utils.responseMsg(msg, false, null))
//       }

//       if(status_code == 500) {
//         res.status(500).send(utils.responseMsg(msg, false, null));
//       }
//   } else {
//       res.send(utils.responseMsg(null, true, msg));
//   }
// }

/**
 * @description Local signup controller.
 * @function signup
 */
exports.signup = async (req, res) => {
	try {
		const doc = req.body;
		const userExist = await User.findOne({user_name: doc.user_name});

		if(userExist == null) {
			doc.password = await bcrypt.hash(doc.password, 10);	
			const mydata = new User(doc);
			await mydata.save();
		
			const msg = "User Created";
			res.status(201).send(utils.responseMsg(null, true, msg));
		} else {
			const msg = "User Existed";
			res.status(409).send(utils.responseMsg(msg, false, null));
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(utils.responseMsg(err.errors, false, null));
	}
};

/**
 * @description Local login controller.
 * @function login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
	const loginMatch =  await User.findOne({email});
	const err_mess = { message: "login failed", status: "Unauthorized" };

	if(loginMatch != null) {
		const match = await bcrypt.compare(password, loginMatch.password);
		if(match) {
			const user = {user_name: loginMatch.user_namee};
			const accessToken = authService.createToken(user);
			res.cookie("jwt", accessToken);

			const message = { message: `login success (${loginMatch.name})` };
			res.send(utils.responseMsg(null, true, message));
			
		} else {
			res.status(401).send(utils.responseMsg(err_mess, false, null));
		}

	} else {
		res.status(401).send(utils.responseMsg(err_mess, false, null));
	}

  } catch (error) {
    console.error('error', error.stack);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};

/**
 * @description Local logout controller.
 * @function logout
 */
 exports.logout =  (req, res) => {
	if(req.headers.cookie == undefined) {
		const message = { message: "User not founded for logout" };
		res.status(404).send(utils.responseMsg(message, false, null));
    } else {
        res.clearCookie("jwt");
		const message = { message: "logout" };
		res.send(utils.responseMsg(null, true, message));
    }
};

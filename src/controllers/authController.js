const authService = require("../services/authServices");
const errorMsg = require("../helpers/errorMessage").errorMessages;
const utils = require("../helpers/utils");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @description Local signup controller.
 * @function signup
 */
exports.signup = async (req, res) => {
  try {
    const doc = req.body;
    doc.user_name = doc.user_name.toLowerCase();
    doc.email = doc.email.toLowerCase();
    const userExist = await mongoose.model("user").findOne({
      $or: [
        { user_name: doc.user_name },
        { email: doc.email },
        { phone: doc.phone },
      ],
    });
    if (userExist == null) {
      doc.password = await bcrypt.hash(doc.password, 10);
      const userData = await mongoose.model("user").create(doc);

      const msg = {
        data: userData,
        message: "User Created",
      };
      return res.status(201).send(utils.responseMsg(null, true, msg));
    } else {
      const errMsg = [];
      if (doc.user_name == userExist.user_name)
        errMsg.push("user_name already existed");
      if (doc.email == userExist.email) errMsg.push("email already existed");
      if (doc.phone == userExist.phone) errMsg.push("phone already existed");
      const msg = {
        message: "User Existed",
        errors: errMsg,
      };
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
    const loginMatch = await mongoose.model("user").findOne({ email });
    const err_mess = { message: "login failed", status: "Unauthorized" };

    if (loginMatch != null) {
      const match = await bcrypt.compare(password, loginMatch.password);
      if (match) {
        const user = { user_name: loginMatch.user_name };
        const accessToken = authService.createToken(user);

        const message = {
          message: `login success (${loginMatch.name})`,
          token: accessToken,
        };
        res.send(utils.responseMsg(null, true, message));
      } else {
        res.status(401).send(utils.responseMsg(err_mess, false, null));
      }
    } else {
      res.status(401).send(utils.responseMsg(err_mess, false, null));
    }
  } catch (error) {
    console.error("error", error.stack);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};

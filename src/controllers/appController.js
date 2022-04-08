const utils = require("../helpers/utils");
const errorMsg = require("../helpers/errorMessage").errorMessages;
const mongoose = require("mongoose");

/**
 * @description get userProfile controller.
 * @function userProfile
 */
exports.userProfile = async (req, res) => {
  try {
    const userData = await mongoose
      .model("user")
      .findOne({ user_name: req.user.user_name });
    if (userData != null) res.send(utils.responseMsg(null, true, userData));
    else
      return res
        .status(401)
        .send(utils.responseMsg(errorMsg.unauthorized, false, null));
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description update userProfile controller.
 * @function updateUserProfile
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const userData = await mongoose
      .model("user")
      .findOne({ user_name: req.user.user_name });
    if (userData != null) {
      const doc = req.body;
      const password_exist = doc.hasOwnProperty("password");
      const email_exist = doc.hasOwnProperty("email");

      if (email_exist) {
        const msg = "Email not Update without OTP verification";
        return res.status(400).send(utils.responseMsg(msg, false, null));
      }

      if (password_exist) {
        doc.password = await bcrypt.hash(doc.password, 10);
        await mongoose
          .model("user")
          .updateOne({ user_name: userData.user_name }, { $set: doc });
      } else
        mongoose
          .model("user")
          .updateOne({ user_name: userData.user_name }, { $set: doc });

      const msg = "Updated";
      return res.send(utils.responseMsg(null, true, msg));
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description delete userProfile controller.
 * @function deleteUserProfile
 */
exports.deleteUserProfile = async (req, res) => {
  try {
    const userData = await mongoose
      .model("user")
      .findOne({ user_name: req.user.user_name });
    if (userData != null) {
      await mongoose.model("user").deleteOne({ user_name: userData.user_name });
      const msg = "User Deleted";
      return res.send(utils.responseMsg(null, true, msg));
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description create tweet controller.
 * @function createTweet
 */
exports.createTweet = async (req, res) => {
  try {
    const obj = req.body;
    const tweet_count = await mongoose.model("tweet").find().count();
    if (tweet_count != 0) {
      const id = tweet_count + 1;
      obj.t_id = id;
    } else obj.t_id = 1;

    obj.user_name = req.user.user_name;

    const tweet = await mongoose.model("tweet").create(obj);
    const msg = {
      data: tweet,
      message: "Tweet Created",
    };
    return res.status(201).send(utils.responseMsg(null, true, msg));
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description timeline controller.
 * @function timeline
 */
exports.timeline = async (req, res) => {
  try {
    const tweetData = await mongoose
      .model("tweet")
      .findOne({ user_name: req.user.user_name });
    if (tweetData.length != 0) {
      return res.send(utils.responseMsg(null, true, tweetData));
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description timelinse sort controller.
 * @function timelineSort
 */
exports.timelineSort = async (req, res) => {
  try {
    if (req.params.sort == "date") {
      const data = await mongoose
        .model("tweet")
        .find({ user_name: req.user.user_name })
        .sort({ createdAt: -1 });
      return res.send(utils.responseMsg(null, true, data));
    }

    if (req.params.sort == "like") {
      const data = await mongoose
        .model("tweet")
        .find({ user_name: req.user.user_name })
        .sort({ liked_by: -1 });
      return res.send(utils.responseMsg(null, true, data));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description update tweet controller.
 * @function updateTweet
 */
exports.updateTweet = async (req, res) => {
  try {
    const para_id = parseInt(req.params.id);
    const tweetData = await mongoose.model("tweet").findOne({ t_id: para_id });

    if (tweetData.length != 0) {
      await mongoose
        .model("tweet")
        .updateOne({ t_id: tweetData[0].t_id }, { $set: req.body });
      const msg = "Tweet Updated";
      return res.send(utils.responseMsg(null, true, msg));
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description delete tweet controller.
 * @function deleteTweet
 */
exports.deleteTweet = async (req, res) => {
  try {
    const para_id = parseInt(req.params.id);
    const tweetData = await mongoose.model("tweet").findOne({ t_id: para_id });

    if (tweetData.length != 0) {
      await mongoose.model("tweet").deleteOne({ t_id: tweetData[0].t_id });
      const msg = "Tweet Deleted";
      return res.send(utils.responseMsg(null, true, msg));
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

/**
 * @description like tweet controller.
 * @function likeTweet
 */
exports.likeTweet = async (req, res) => {
  try {
    const para_id = parseInt(req.params.id);
    const tweetData = await mongoose.model("tweet").findOne({ t_id: para_id });

    if (tweetData.length != 0) {
      const isLiked = tweetData[0].liked_by.find(
        (e) => e.user_name == req.user.user_name
      );
      if (isLiked == undefined) {
        await mongoose
          .model("tweet")
          .updateOne(
            { t_id: para_id },
            { $push: { liked_by: { user_name: req.user.user_name } } }
          );
        await mongoose
          .model("user")
          .updateOne(
            { user_name: req.user.user_name },
            { $push: { liked_tweet: { t_id: para_id } } }
          );

        const msg = "like added";
        return res.send(utils.responseMsg(null, true, msg));
      } else {
        await mongoose
          .model("tweet")
          .updateOne(
            { t_id: para_id },
            { $pull: { liked_by: { user_name: req.user.user_name } } }
          );
        await mongoose
          .model("user")
          .updateOne(
            { user_name: req.user.user_name },
            { $pull: { liked_tweet: { t_id: para_id } } }
          );

        const msg = "like remove";
        return res.send(utils.responseMsg(null, true, msg));
      }
    } else {
      return res
        .status(404)
        .send(utils.responseMsg(errorMsg.dataNotFound, false, null));
    }
  } catch (err) {
    console.error("error", err.stack);
    return res
      .status(500)
      .send(utils.responseMsg(errorMsg.internalServerError, false, null));
  }
};

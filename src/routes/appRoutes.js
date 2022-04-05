const router = require('express').Router();
const tool = require("../../tool");
const { appController } = require('./routesDependencies').default;
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/profile", appController.token_check, appController.userProfile);
router.put("/profile", appController.token_check, appController.updateUserProfile);
router.delete("/profile", appController.token_check, appController.deleteUserProfile);

// tweets routes
router.post("/profile/tweets", appController.token_check, appController.createTweet);
router.get("/profile/timeline", appController.token_check, appController.timeline);
router.put("/profile/tweets/:id", appController.token_check, appController.updateTweet);
router.delete("/profile/tweets/:id", appController.token_check, appController.deleteTweet);


router.get("/timeline/:sort", (req, res) => {
    if(req.session.user) {
        if(req.params.sort == "date") {
            const sorted = tool.sort_func("date");
            appController.send_func(sorted, res);
        }
        
        if(req.params.sort == "like") {
            const sorted = tool.sort_func("like");
            appController.send_func(sorted, res);
        }
    } else {
        appController.error_func(401, res);
    }
});

router.put("/profile/tweets/:id/like/", appController.token_check, appController.likeTweet);

module.exports = router;

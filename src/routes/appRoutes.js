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

router.put("/like/:id", (req, res) => {
    if(req.session.user) {
        tool.get_user().then(user_data => {
            const udata = user_data.find(e => req.session.user.user_name == e.user_name);
            const para_id = parseInt(req.params.id);

            if(udata) {
                const liked = tool.like_func(udata, para_id, "like");
                if(liked) {
                    appController.send_func(liked, res);
                } else appController.error_func(404, res);
                
            } else {
                appController.error_func(404, res);
            }
        }).catch((err) => {
            console.error('error', err.stack);
            appController.error_func(500, res);
        });
    } else {
        appController.error_func(401, res);
    }
});

router.put("/unlike/:id", (req, res) => {
    if(req.session.user) {
        tool.get_user().then(user_data => {
            const udata = user_data.find(e => req.session.user.user_name == e.user_name);
            const para_id = parseInt(req.params.id);

            if(udata) {
                const liked = tool.like_func(udata, para_id, "unlike");
                if(liked) {
                    appController.send_func(liked, res);
                } else appController.error_func(404, res);
                
            } else {
                appController.error_func(404, res);
            }
        }).catch((err) => {
            console.error('error', err.stack);
            appController.error_func(500, res);
        });
    } else {
        appController.error_func(401, res);
    }
});

module.exports = router;

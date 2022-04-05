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

router.get("/tweets", (req, res) => {
    if(req.session.user) {
        tool.get_tweet().then(tweet_data => {
            const udata = tweet_data.find(e => req.session.user.user_name == e.user_name);
            if(udata) {
                const disp = tool.display_tweet(udata.user_name);
                appController.send_func(disp, res);
    
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

router.get("/tweets/:id", (req, res) => {
    if(req.session.user) {
        tool.get_tweet().then(tweet_data => {
            const udata = tweet_data.find(e => req.session.user.user_name == e.user_name);
            const para_id = parseInt(req.params.id);
            const u_id = tool.tweet_match(req, para_id, tweet_data);

            if(udata) {
                if(u_id) {
                    const disp = tool.display_tweet(udata.user_name, para_id);
                    appController.send_func(disp, res);
                } else appController.error_func(401, res);
    
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

router.put("/tweets/:id", (req, res) => {
    if(req.session.user) {
        tool.get_tweet().then(tweet_data => {
            const udata = tweet_data.find(e => req.session.user.user_name == e.user_name);
            const para_id = parseInt(req.params.id);
            const u_id = tool.tweet_match(req, para_id, tweet_data);

            if(udata) {
                if(u_id) {
                    const update = tool.update_tweet(udata.user_name, para_id, req.body);
                    appController.send_func(update, res);
                } else appController.error_func(401, res);
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


router.delete("/tweets/:id", (req, res) => {
    if(req.session.user) {
        tool.get_tweet().then(tweet_data => {
            const udata = tweet_data.find(e => req.session.user.user_name == e.user_name);
            const para_id = parseInt(req.params.id);
            const u_id = tool.tweet_match(req, para_id, tweet_data);

            if(udata) {
                if(u_id) {
                    const del = tool.delete_tweet(udata.user_name, para_id);
                    appController.send_func(del, res);
                } else appController.error_func(401, res);
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

router.get("/timeline", (req, res) => {
    if(req.session.user) {
        const disp = tool.get_tweet();
        appController.send_func(disp, res);
    } else {
        appController.error_func(401, res);
    }
});

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

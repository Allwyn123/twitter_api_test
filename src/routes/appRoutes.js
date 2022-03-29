const router = require('express').Router();
const tool = require("../../tool");
const { appController } = require('./routesDependencies').default;

router.get("/profile", (req, res) => {
    if(req.session.user) {
        tool.get_user().then(user_data => {
            const udata = user_data.find(e => req.session.user.user_name == e.user_name);
            if(udata) {
                const disp = tool.display_user(udata.user_name);
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

router.put("/profile", (req, res) => {
    if(req.session.user) {
        tool.get_user().then(user_data => {
            const udata = user_data.find(e => req.session.user.user_name == e.user_name);
            if(udata) {
                const update = tool.update_user(udata.user_name, req.body);
                appController.send_func(update, res);
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


router.delete("/profile", (req, res) => {
    if(req.session.user) {
        tool.get_user().then(user_data => {
            const udata = user_data.find(e => req.session.user.user_name == e.user_name);
            if(udata) {
                const del = tool.delete_user(udata.user_name);
                req.session.destroy();
                appController.send_func(del, res);
            } else {
                appController.error_func(404, res);
            }
        }).catch((err) => {
            console.error('error', err.stack);
            appController.error_func(500, res);
        })

    } else {
        appController.error_func(401, res);
    }
});

module.exports = router;

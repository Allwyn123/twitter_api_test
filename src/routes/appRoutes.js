const router = require('express').Router();
const tool = require("../../tool");
const { User } = require('../models/userModel');
const { appController } = require('./routesDependencies').default;

router.get("/profile", (req, res) => {
    if(req.session.user) {
        tool.get_doc().then(user_data => {
            user_data.find(e => req.session.user.user_name == e.user_name);
            if(user_data) {
                const disp = tool.display_doc(user_data.user_name);
                appController.send_func(disp, res);
    
            } else {
                appController.error_func(404, res);
            }
        });

    } else {
        appController.error_func(401, res);
    }
});

module.exports = router;

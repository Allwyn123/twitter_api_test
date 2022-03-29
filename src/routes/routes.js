const router = require('express').Router();
// const appRoutes = require('./appRoutes');
const authRoutes = require('./authRoutes');
// const passport = require('passport');
const dependencies = require('./routesDependencies').default;


router.get('/health', dependencies.serverHealth.checkHealth);

// router.use('/app', passport.authenticate('jwt', { session : false }), appRoutes);
router.use(authRoutes);

module.exports = router;

const router = require('express').Router();
const appRoutes = require('./appRoutes');
const authRoutes = require('./authRoutes');
const dependencies = require('./routesDependencies').default;


router.get('/health', dependencies.serverHealth.checkHealth);

router.use(authRoutes);
router.use(appRoutes);

module.exports = router;

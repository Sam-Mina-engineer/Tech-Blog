const router = require('express').Router();
const apiRoutes = require('./api');

// Import the API routes

router.use('/api', apiRoutes);

// Handle requests to wrong routes

router.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

module.exports = router;


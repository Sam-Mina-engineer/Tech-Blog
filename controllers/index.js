const router = require('express').Router();
const apiRoutes = require('./api');
const withAuth = require('../config/auth');

// Import the API routes

router.use('/api', apiRoutes);

// Route to render the signup page

router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to render the homepage

router.get('/', (req, res) => {
  res.render('homepage');
});

// Route to render the login page

router.get('/login', (req, res) => {
  res.render('login');
});

// Route to render the dashboard page

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard');
});

// Handle requests to wrong routes

router.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

module.exports = router;

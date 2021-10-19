const express = require('express');
const emailRoutes = require('./email.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/check
 */
router.use('/check', emailRoutes);

module.exports = router;

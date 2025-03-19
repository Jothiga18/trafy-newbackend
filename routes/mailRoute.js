const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

// Payment routes
router.post('/sendBetaEmail', mailController.sendNewsletterWelcomeEmail)
// router.post('/sendJoinFormEmail', paymentController.sendJoinFormEmail);



module.exports = router;

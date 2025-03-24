const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

// Payment routes
router.post('/sendEmail', mailController.sendNewsletterWelcomeEmail)
// router.post('/sendJoinFormEmail', paymentController.sendJoinFormEmail);



module.exports = router;

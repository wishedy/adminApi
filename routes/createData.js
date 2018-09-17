'use strict';
const express = require('express');
import Customer from '../controller/fabricationVirtualData/customer/customer.js';
import Feedback from '../controller/fabricationVirtualData/feedback/feedback.js';
const router = express.Router();
router.get('/customer',Customer.createCustomer);
router.get('/feedBack',Feedback.createFeedback);
export default router;
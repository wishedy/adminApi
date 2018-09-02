'use strict';
const express = require('express');
import Customer from '../controller/fabricationVirtualData/customer/customer.js';
const router = express.Router();
router.get('/customer',Customer.createCustomer);
export default router;
'use strict';
const express = require('express');
import Customer from '../controller/customer/customer.js';
const router = express.Router();
router.get('/getCustomerList',Customer.getCustomerList);
router.get('/changeCustomerState',Customer.changeCustomerState);
export default router;
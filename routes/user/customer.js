'use strict';
const express = require('express');
import Customer from '../../controller/user/customer';
const router = express.Router();
router.get('/list',Customer.getList);
router.post('/single',Customer.create);
router.get('/single',Customer.getSingle);
router.put('/single',Customer.update);
export default router;

'use strict';
const express = require('express');
import column from '../controller/column/column.js';
const router = express.Router();
router.get('/getList',column.getJsonList);
router.post('/create',column.createColumn);
export default router;
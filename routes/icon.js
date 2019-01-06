'use strict';
const express = require('express');
import icon from '../controller/icon/icon.js';
const router = express.Router();
router.get('/getList',icon.getJsonList);
router.post('/create',icon.createIcon);
export default router;
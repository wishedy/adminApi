'use strict';
const express = require('express');
import Dynamic from '../controller/dynamic/dynamic.js';
const router = express.Router();
router.get('/getDynamicList',Dynamic.getJsonList);
router.post('/active',Dynamic.changeDynamicState);
router.post('/invalid',Dynamic.changeDynamicState);
export default router;
'use strict';
const express = require('express');
import aSide from '../controller/aside/aside.js';
const router = express.Router();
router.get('/getList',aSide.getJsonList);
router.post('/createSide',aSide.createSide);
export default router;
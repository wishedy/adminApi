'use strict';
const express = require('express');
import Recommend from '../controller/recommend/recommend.js';
const router = express.Router();
router.get('/getRecommendList',Recommend.getJsonList);
router.post('/active',Recommend.changeRecommendState);
router.post('/invalid',Recommend.changeRecommendState);
router.post('/update',Recommend.changeRecommendInfo);
export default router;
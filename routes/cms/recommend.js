'use strict';
const express = require('express');
import Recommend from '../../controller/cms/recommend';
const router = express.Router();
router.get('/list',Recommend.getList);
router.get('/single',Recommend.getSingle);
router.put('/single',Recommend.update);
export default router;

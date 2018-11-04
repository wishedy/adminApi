'use strict';
const express = require('express');
import Family from '../../../controller/user/family/family';
const router = express.Router();
router.get('/list',Family.getList);
router.get('/single',Family.getSingle);
router.put('/single',Family.update);
export default router;

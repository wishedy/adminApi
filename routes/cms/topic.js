'use strict';
const express = require('express');
import Topic from '../../controller/cms/topic';
const router = express.Router();
router.get('/list',Topic.getList);
router.post('/single',Topic.create);
router.get('/single',Topic.getSingle);
router.put('/single',Topic.update);
export default router;

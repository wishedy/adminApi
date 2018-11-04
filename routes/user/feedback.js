'use strict';
const express = require('express');
import Feedback from '../../controller/user/feedback';
const router = express.Router();
router.get('/list',Feedback.getList);
router.post('/single',Feedback.create);
router.get('/single',Feedback.getSingle);
router.put('/single',Feedback.update);
export default router;

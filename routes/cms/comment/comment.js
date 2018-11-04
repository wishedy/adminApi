'use strict';
const express = require('express');
import Comment from '../../../controller/cms/comment/comment';
const router = express.Router();
router.get('/list',Comment.getList);
router.get('/single',Comment.getSingle);
router.put('/single',Comment.update);
export default router;

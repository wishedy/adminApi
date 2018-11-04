'use strict';
const express = require('express');
import Article from '../../controller/cms/article.js';
const router = express.Router();
router.get('/list',Article.getList);
router.get('/single',Article.getSingle);
router.put('/single',Article.update);
export default router;

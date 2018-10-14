'use strict';
const express = require('express');
import Article from '../controller/article/article.js';
const router = express.Router();
router.get('/getArticleList',Article.getJsonList);
router.post('/active',Article.changeArticleState);
router.post('/invalid',Article.changeArticleState);
export default router;
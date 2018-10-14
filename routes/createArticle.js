'use strict';
const express = require('express');
import Article from '../controller/createArticle/createArticle.js';
const router = express.Router();
router.get('/create',Article.create);
export default router;
'use strict';
const express = require('express');
import Template from '../../controller/template/template.js';
const router = express.Router();
router.get('/list',Template.getList);
router.get('/single',Template.getSingle);
router.put('/single',Template.update);
export default router;

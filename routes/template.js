'use strict';
const express = require('express');
import Template from '../controller/template/template.js';
const router = express.Router();
router.get('/getTemplateList',Template.getJsonList);
router.post('/active',Template.changeTemplateState);
router.post('/invalid',Template.changeTemplateState);
router.post('/update',Template.updateTemplate);
export default router;
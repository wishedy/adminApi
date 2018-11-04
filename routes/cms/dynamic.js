'use strict';
const express = require('express');
import Dynamic from '../../controller/cms/dynamic';
const router = express.Router();
router.get('/list',Dynamic.getList);
router.get('/single',Dynamic.getSingle);
router.put('/single',Dynamic.update);
export default router;

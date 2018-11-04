'use strict';
const express = require('express');
import Interest from '../../../controller/user/interest/interest';
const router = express.Router();
router.get('/list',Interest.getList);
router.get('/single',Interest.getSingle);
router.put('/single',Interest.update);
export default router;

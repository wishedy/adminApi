'use strict';
const express = require('express');
import Audit from '../../controller/user/audit';
const router = express.Router();
router.get('/list',Audit.getList);
router.get('/single',Audit.getSingle);
router.put('/single',Audit.update);
export default router;

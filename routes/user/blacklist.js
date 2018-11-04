'use strict';
const express = require('express');
import Blacklist from '../../controller/user/blacklist';
const router = express.Router();
router.get('/list',Blacklist.getList);
router.post('/single',Blacklist.create);
router.get('/single',Blacklist.getSingle);
router.put('/single',Blacklist.update);
export default router;

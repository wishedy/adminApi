'use strict';
const express = require('express');
import Message from '../../controller/message/message';
const router = express.Router();

router.get('/list',Message.getList);
router.get('/single',Message.getSingle);
router.put('/single',Message.update);

export default router;

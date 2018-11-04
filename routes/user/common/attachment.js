'use strict';
const express = require('express');
import Attachment from '../../../controller/user/attachment/attachment';
const router = express.Router();
router.get('/list',Attachment.getList);
router.get('/single',Attachment.getSingle);
router.put('/single',Attachment.update);
export default router;

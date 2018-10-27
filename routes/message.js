'use strict';
const express = require('express');
import Message from '../controller/message/message.js';
const router = express.Router();
/* 前端接口 */
// router.get('/follow',Message.getFollowers);
// router.post('/follow',Message.follow);
// router.post('/unfollow',Message.unfollow);
// router.get('/comments',Message.getComments);
// router.post('/comments',Message.addComment);
// router.put('/comments',Message.updateComment);
// router.delete('/comments',Message.deleteComment);

/* 管理平台接口 */
router.get('/messages',Message.getList);
router.put('/messages',Message.updateMessage);
export default router;

'use strict';
const express = require('express');
import MessageScene from "../../controller/message/messageScene";
const router = express.Router();

router.get('/list',MessageScene.getList);
router.post('/single',MessageScene.create);
router.get('/single',MessageScene.getSingle);
router.put('/single',MessageScene.update);

export default router;

'use strict';
const express = require('express');
import Message from '../controller/message/message.js';
const router = express.Router();
router.get('/messages',Message.getList);
router.put('/activate',Message.activate);
router.put('/inactive',Message.inactive);

router.get('/sceneMessages',Message.getSceneList);
router.post('/sceneMessages',Message.createSceneMessage);
router.put('/sceneMessages',Message.updateSceneMessage);
router.put('/sceneMessagesActivate',Message.activateScene);
router.put('/sceneMessagesInactive',Message.inactiveScene);
export default router;

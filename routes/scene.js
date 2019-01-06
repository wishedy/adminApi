'use strict';
const express = require('express');
import Scene from '../controller/scene/scene.js';
const router = express.Router();

/* 管理平台接口 */
router.get('/scene',Scene.getSceneList);
router.post('/scene',Scene.createScene);
router.put('/scene',Scene.updateScene);

export default router;

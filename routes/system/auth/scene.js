'use strict';
const express = require('express');
import Scene from '../../../controller/system/auth/scene';
const router = express.Router();
router.get('/list',Scene.getList);
router.get('/single',Scene.getSingle);
router.put('/single',Scene.update);
export default router;

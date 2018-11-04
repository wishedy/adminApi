'use strict';
const express = require('express');
import Admin from '../../controller/system/admin.js';
const router = express.Router();
router.post('/register',Admin.register);
router.post('/login',Admin.login);
router.get('/logout',Admin.logout);
router.put('/updatePassword',Admin.updatePassword);
export default router;

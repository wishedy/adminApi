'use strict';
const express = require('express');

import Attachment from '../../controller/fabricationVirtualData/user/common/attachment.js';
import Family from '../../controller/fabricationVirtualData/user/common/family';
import Interest from '../../controller/fabricationVirtualData/user/common/interest';
import Audit from '../../controller/fabricationVirtualData/user/audit.js';
import Blacklist from '../../controller/fabricationVirtualData/user/blacklist.js';
import Customer from '../../controller/fabricationVirtualData/user/customer.js';
import Feedback from '../../controller/fabricationVirtualData/user/feedback.js';

import Comment from '../../controller/fabricationVirtualData/cms/comment/comment';
import Article from '../../controller/fabricationVirtualData/cms/article.js';
import Dynamic from '../../controller/fabricationVirtualData/cms/dynamic.js';
import Recommend from '../../controller/fabricationVirtualData/cms/recommend.js';
import Topic from '../../controller/fabricationVirtualData/cms/topic.js';

import Scene from '../../controller/fabricationVirtualData/system/auth/scene';
import Admin from '../../controller/fabricationVirtualData/system/admin';

import Template from '../../controller/fabricationVirtualData/template/template.js';

const router = express.Router();

router.get('/user/common/attachment',Attachment.createCustomer);
router.get('/user/common/family',Family.createCustomer);
router.get('/user/common/interest',Interest.createCustomer);
router.get('/user/audit',Audit.createCustomer);
router.get('/user/blacklist',Blacklist.createCustomer);
router.get('/user/customer',Customer.createCustomer);
router.get('/user/feedBack',Feedback.createCustomer);

router.get('/cms/common/comment',Comment.createCustomer);
router.get('/cms/article',Article.createCustomer);
router.get('/cms/dynamic',Dynamic.createCustomer);
router.get('/cms/recommend',Recommend.createCustomer);
router.get('/cms/topic',Topic.createCustomer);

router.get('/system/auth/scene',Scene.createCustomer);
router.get('/system/admin',Admin.createCustomer);

router.get('/template',Template.createCustomer);

export default router;

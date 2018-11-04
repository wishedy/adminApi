'use strict';
import admin from './system/admin.js';
import scene from './system/auth/scene';

import comment from './cms/comment/comment';
import article from './cms/article';
import dynamic from './cms/dynamic.js';
import recommend from './cms/recommend.js';
import topic from './cms/topic.js';

import message from './message/message';
import messageScene from './message/messageScene.js';

import attachment from './user/common/attachment';
import family from './user/common/family';
import interest from './user/common/interest';
import audit from './user/audit';
import blacklist from './user/blacklist';
import customer from './user/customer';
import feedback from './user/feedback';

import createData from './other/createData.js';
import Template from './other/template.js';

export default app=>{
    app.use('/call/system/admin',admin);
    app.use('/call/system/auth/scene',scene);

    app.use('/call/cms/common/comment',comment);
    app.use('/call/cms/article',article);
    app.use('/call/cms/dynamic',dynamic);
    app.use('/call/cms/recommend',recommend);
    app.use('/call/cms/topic',topic);

    app.use('/call/user/common/attachment',attachment);
    app.use('/call/user/common/family',family);
    app.use('/call/user/common/interest',interest);
    app.use('/call/user/audit',audit);
    app.use('/call/user/blacklist',blacklist);
    app.use('/call/user/customer',customer);
    app.use('/call/user/feedback',feedback);

    app.use('/call/message',message);
    app.use('/call/messageScene',messageScene);

    app.use('/call/createVirtualData',createData);
    app.use('/call/template',Template);
}

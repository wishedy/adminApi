'use strict';
import admin from './admin.js';
import createData from './createData.js';
import customer from './customer.js';
import dynamic from './dynamic.js';
import topic from './topic.js';
import Recommend from './recommend.js';
import Article from './article.js';
import CreateArticle from './createArticle.js';
import Template from './template.js';
import message from './message.js';
import scene from './scene.js';
export default app=>{
    app.use('/call/admin',admin);
    app.use('/call/createVirtualData',createData);
    app.use('/call/customer',customer);
    app.use('/call/dynamic',dynamic);
    app.use('/call/topic',topic);
    app.use('/call/recommend',Recommend);
    app.use('/call/article',Article);
    app.use('/call/createArticle',CreateArticle);
    app.use('/call/template',Template);
    app.use('/call/message',message);
    app.use('/call/scene',scene);
}
